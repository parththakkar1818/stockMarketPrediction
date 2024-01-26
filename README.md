# stockMarketPrediction
# Stock Market Prediction with LSTM

## Overview
This MERN (MongoDB, Express.js, React.js, Node.js) project combines stock market data retrieval, visualization, and machine learning prediction using LSTM (Long Short-Term Memory). Users can select a stock, specify a date range, and visualize historical data along with a prediction for the stock value after 30 days.

## Features
- **Stock Data Visualization:** View historical stock data in graphical form.
- **Machine Learning Prediction:** Utilize LSTM to predict the stock value after 30 days.
- **User-friendly Interface:** Simple and intuitive interface for selecting stocks and date ranges.
- **Data Source:** Data is fetched from a reliable financial data API.

## Screenshots

### Home Screen
![Home Screen](./screenshots/home_screen.png)

### Stock Data Visualization
![Stock Data Visualization](./screenshots/stock_visualization.png)

### LSTM Prediction
![LSTM Prediction](./screenshots/lstm_prediction.png)

## Prerequisites
- Node.js and npm installed
- MongoDB installed and running

## Getting Started
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/stock-market-prediction.git
    cd stock-market-prediction
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables with your API keys and other sensitive information:
        ```
        REACT_APP_API_KEY=your_api_key
        MONGODB_URI=your_mongodb_uri
        ```

4. Run the application:
    ```bash
    npm start
    ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Machine Learning: LSTM

## Contributors
- Your Name ([Your GitHub Profile](https://github.com/your-username))

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
