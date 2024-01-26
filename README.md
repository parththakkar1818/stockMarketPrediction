# Stock Market Prediction with LSTM

## Overview
This project combines stock market data retrieval, visualization, and machine learning prediction using LSTM (Long Short-Term Memory). Users can select a stock, specify a date range, visualize historical data, and download stock data in XLS format. The application also provides a prediction for the stock value after 30 days.

## Features
- **Stock Data Visualization:** View historical stock data in graphical form.
- **Machine Learning Prediction:** Utilize LSTM to predict the stock value after 30 days.
- **User-friendly Interface:** Simple and intuitive interface for selecting stocks and date ranges.
- **Data Source:** Data is fetched from a reliable financial data API.
- **Downloadable Data:** Users can download stock data in XLS format.

## Screenshots

### Home Screen
![Home Screen](https://github.com/parththakkar1818/stockMarketPrediction/assets/121672669/b8d4d6f3-cb97-46c4-8fc9-73dc836659af)


### Stock Data Visualization
![Stock Data Visualization](https://github.com/parththakkar1818/stockMarketPrediction/assets/121672669/53647313-307b-446d-aa9d-db5e79639ec2)
![Stock Data Visualization](https://github.com/parththakkar1818/stockMarketPrediction/assets/121672669/f3a57493-a0df-4829-9b1c-7c033ec52d49)



### LSTM Prediction
![LSTM Prediction](https://github.com/parththakkar1818/stockMarketPrediction/assets/121672669/b102cd54-f517-4c02-a6b0-e0ec1d52a540)



### Downloadable Data
![Downloadable Data](https://github.com/parththakkar1818/stockMarketPrediction/assets/121672669/74436d45-81b4-4f29-a656-3c21c6b9dc3f)

## Prerequisites
- Node.js and npm installed

## Getting Started
1. Download code from:
    ```bash
    git clone https://github.com/parththakkar1818/stockMarketPrediction.git
    ```

2. Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```

3. Start the frontend application:
    ```bash
    npm start
    ```

4. Open a new terminal window, navigate to the backend directory, and install dependencies:
    ```bash
    cd ../backend
    npm install
    ```

5. Start the backend server:
    ```bash
    node index.js
    ```

6. Access the application at [http://localhost:3000](http://localhost:3000).

**Note:** Ensure that you have Node.js and npm installed on your machine.

## Tech Stack
- Frontend: React.js, Chart.js
- Backend: Node.js, Express.js
- Machine Learning: LSTM

## Contributors
- Parth Thakkar ([GitHub Profile](https://github.com/parththakkar1818))
