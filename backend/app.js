require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection into Altal or local storage on compass server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Crypto Schema
const cryptoSchema = new mongoose.Schema({
  coinId: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

// Fetch Crypto Data and Store in DB
const fetchCryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=true`
    );

    // Check API Response
    console.log("API Response:", response.data);

    for (const [coinId, data] of Object.entries(response.data)) {
      console.log(`Saving data for ${coinId} - Price: ${data.usd}, MarketCap: ${data.usd_market_cap}, 24h Change: ${data.usd_24h_change}`);
      await Crypto.create({
        coinId,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change
      });
      console.log(`Data saved for ${coinId}`);
    }
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

// API Routes
app.get('/stats', async (req, res) => {
  try {
    const { coin } = req.query;
    const latestData = await Crypto.findOne({ coinId: coin })
      .sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/deviation', async (req, res) => {
  try {
    const { coin } = req.query;
    const data = await Crypto.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('price');

    if (!data.length) {
      return res.status(404).json({ error: 'No data found' });
    }

    const prices = data.map(d => d.price);
    const mean = prices.reduce((a, b) => a + b) / prices.length;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({
      deviation: parseFloat(deviation.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Initialize Server
const init = async () => {
  await connectDB();
  
  // Schedule Background Job to Fetch Data Every 2 Hours
  cron.schedule('0 */2 * * *', fetchCryptoData);
  
  // Initial Fetch
  await fetchCryptoData();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

init();
