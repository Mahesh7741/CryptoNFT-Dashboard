#                                                             Crypto Dashboard🚀📉

Welcome to the Crypto Price Tracker project! This application tracks the prices of major cryptocurrencies such as **Bitcoin**, **Ethereum**, and **Polygon (MATIC)**, and provides real-time price updates, market cap information, and 24-hour price change percentages. It also calculates the standard deviation of price changes over the last 100 records.

# 📸 Video Demo 🎬 Check out the video demo for a walkthrough of the app:

https://github.com/user-attachments/assets/8e669cb7-53a6-4e63-b8ed-e82a086f7273


# Images

- # Light Mode 💡
![Screenshot 2025-01-10 172404](https://github.com/user-attachments/assets/b6740741-0e79-4ef0-826d-629a01f6e89f)

- # Dark Mode 🌑
![Screenshot 2025-01-10 172414](https://github.com/user-attachments/assets/6cb38a1e-6622-4fcd-bdeb-c122f0425aa1)



## Features ✨
- **Live Crypto Stats**: Track live prices, market cap, and 24-hour price changes.
- **Price Deviation**: View the price standard deviation over the last 100 records.
- **Price History Chart**: Visualize the historical price movement over time.
- **Periodic Updates**: Data is automatically refreshed every 5 minutes.
- **Responsive UI**: Works smoothly across all devices (desktop, tablet, mobile).

## Technologies Used 🛠️
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (for storing crypto data)
  - Axios (for making API requests to fetch live crypto data)
  - Cron (for scheduling periodic background tasks)
  
- **Frontend**:
  - React.js
  - Recharts (for plotting the price history chart)
  - Tailwind CSS (for styling)
  - Axios (for communicating with the backend API)

## Prerequisites 📦

Before starting, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **MongoDB** (optional if you're using a local database): [Download MongoDB](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Setup Instructions 📝

### 1. Clone the repository
```bash
git clone https://github.com/Mahesh7741/CryptoNFT-Dashboard.git
cd crypto-price-tracker
```
### 2. Backend Setup 🖥️
  - Install dependencies:
    ```bash
    cd backend
    npm install
    ```
  - Create a .env file in the backend directory and add the following (optional for DB URL):
    ```paintext
    MONGODB_URI=mongodb://localhost:27017
    ```
  - Start the backend server:
    ```bash
    npm start
    ```
### 2. Backend Setup 🖥️
  -Install dependencies:
  ```bash
    cd frontend
    npm install
  ```
  -Start the frontend server:
  ```bash
    npm start
  ```
--- The frontend server will run on http://localhost:3000.

### Usage 🚀
  - Once both the backend and frontend are up and running, you can visit the app in your browser at http://localhost:3000. You will be able to select different cryptocurrencies from a dropdown and view their live price, market cap, and 24-hour change. You will also see the price history in a graph and the standard deviation of price changes.


  
