import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, RefreshCcw, Sun, Moon, Monitor } from 'lucide-react';

const CryptoTracker = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [cryptoData, setCryptoData] = useState(null);
  const [deviation, setDeviation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(theme === 'dark');
      }
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme, isDark]);

  const coins = [
    { id: 'bitcoin', name: 'Bitcoin (BTC)', icon: '₿' },
    { id: 'matic-network', name: 'Polygon (MATIC)', icon: 'M' },
    { id: 'ethereum', name: 'Ethereum (ETH)', icon: 'Ξ' }
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulated data for demonstration
      const mockData = {
        price: 45000 + Math.random() * 1000,
        marketCap: 800000000000 + Math.random() * 10000000000,
        '24hChange': -2.5 + Math.random() * 5,
        volume: 24000000000 + Math.random() * 1000000000,
        dominance: 40 + Math.random() * 5
      };
      
      const mockDeviation = {
        deviation: 1200 + Math.random() * 100
      };

      setCryptoData(mockData);
      setDeviation(mockDeviation);
      setLastUpdated(new Date().toLocaleString());

      setPriceHistory(prev => [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          price: mockData.price
        }
      ].slice(-20));
    } catch (err) {
      setError('Failed to fetch crypto data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  const ThemeSelector = () => (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-colors ${theme === 'light' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}`}
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}`}
      >
        <Moon size={20} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-colors ${theme === 'system' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}`}
      >
        <Monitor size={20} />
      </button>
    </div>
  );

  const CryptoCard = ({ title, value, icon, trend, additionalInfo }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">{title}</h2>
        {icon}
      </div>
      <p className={`text-3xl font-bold ${trend === 'up' ? 'text-green-600 dark:text-green-400' : trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </p>
      {additionalInfo && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{additionalInfo}</p>
      )}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-600 dark:text-gray-300">Loading latest data...</p>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Crypto Dashboard
            </h1>
            <ThemeSelector />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.icon} {coin.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={fetchData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              <RefreshCcw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error ? (
          <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {cryptoData && (
                <>
                  <CryptoCard
                    title="Current Price"
                    value={`$${cryptoData.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    icon={<DollarSign className="text-blue-500 dark:text-blue-400" size={24} />}
                    additionalInfo="Live price updates every 30s"
                  />
                  <CryptoCard
                    title="Market Cap"
                    value={`$${(cryptoData.marketCap / 1e9).toFixed(2)}B`}
                    icon={<Activity className="text-purple-500 dark:text-purple-400" size={24} />}
                    additionalInfo={`Market Dominance: ${cryptoData.dominance.toFixed(2)}%`}
                  />
                  <CryptoCard
                    title="24h Change"
                    value={`${cryptoData['24hChange'].toFixed(2)}%`}
                    icon={cryptoData['24hChange'] >= 0 ? 
                      <TrendingUp className="text-green-500 dark:text-green-400" size={24} /> : 
                      <TrendingDown className="text-red-500 dark:text-red-400" size={24} />}
                    trend={cryptoData['24hChange'] >= 0 ? 'up' : 'down'}
                    additionalInfo={`Volume: $${(cryptoData.volume / 1e9).toFixed(2)}B`}
                  />
                </>
              )}
            </div>

            {deviation && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Price Volatility</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${deviation.deviation.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Standard Deviation (100 records)</p>
                  </div>
                  <Activity className="text-blue-500 dark:text-blue-400" size={32} />
                </div>
              </div>
            )}

            {priceHistory.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Price History</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {lastUpdated}</p>
                </div>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={isDark ? '#374151' : '#e5e7eb'}
                      />
                      <XAxis 
                        dataKey="timestamp"
                        stroke={isDark ? '#9CA3AF' : '#6B7280'}
                        fontSize={12}
                      />
                      <YAxis
                        stroke={isDark ? '#9CA3AF' : '#6B7280'}
                        fontSize={12}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? '#1F2937' : 'white',
                          border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          color: isDark ? '#F3F4F6' : '#111827'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={isDark ? '#60A5FA' : '#3B82F6'}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoTracker;