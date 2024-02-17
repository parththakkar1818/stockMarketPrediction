import pandas as pd
import yfinance as yf
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
import math
from pymongo import MongoClient
import json
import sys
import pickle

def save_model_to_db(start, end, stock_symbol, model):
    client = MongoClient('mongodb://localhost:27017/')  # Connect to MongoDB
    db = client['Stock_Market_Prediction']  # Database name
    collection = db['prediction_model']  # Collection name

    # Save the model to the database
    serialized_model = pickle.dumps(model)
    collection.insert_one({'stock_symbol': stock_symbol, 'start_date': start, 'end_date': end, 'model': serialized_model})
    client.close()

if __name__ == "__main__":
    combined_args = sys.argv[1]
    start, end, stock_symbol = combined_args.split(',')
    ttl_days=30
    # print(start, end, stock_symbol)

    client = MongoClient('mongodb://localhost:27017/')  # Connect to MongoDB
    db = client['Stock_Market_Prediction']  # Database name
    collection = db['prediction_model']  # Collection name

    # Check if model already exists for the specified stock and timeframe
    existing_model = collection.find_one({'stock_symbol': stock_symbol})

    df = yf.download(stock_symbol+".NS", start, end)
    df1 = df.reset_index()['Close']

    # Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    df1 = scaler.fit_transform(np.array(df1).reshape(-1, 1))

    # Prepare training and testing data
    training_size = int(len(df1) * 0.75)
    test_size = len(df1) - training_size
    train_data, test_data = df1[0:training_size, :], df1[training_size:len(df1), :1]

    # Define a function to create datasets
    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset) - time_step - 1):
            a = dataset[i:(i + time_step), 0]
            dataX.append(a)
            dataY.append(dataset[i + time_step, 0])
        return np.array(dataX), np.array(dataY)
    
    time_step = test_size - 5

    # Create train and test datasets
    X_train, y_train = create_dataset(train_data, time_step)
    X_test, y_test = create_dataset(test_data, time_step)

    # Reshape input to be [samples, time steps, features] for LSTM
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

    if existing_model:
        loaded_model = pickle.loads(existing_model['model'])
        predictions = []
        x_input = test_data[-time_step:].reshape(1, time_step, 1)
        for i in range(ttl_days):
            yhat = loaded_model.predict(x_input, verbose=0)
            predictions.append(yhat[0, 0])
            x_input = np.append(x_input, yhat.reshape(1, 1, 1), axis=1)
            x_input = x_input[:, 1:, :]

        # Inverse transform the predictions to get actual stock prices
        predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
        print(predictions.tolist())
        client.close()
    else:
        model = Sequential()
        model.add(LSTM(50, return_sequences=True, input_shape=(time_step, 1)))
        model.add(LSTM(50, return_sequences=True))
        model.add(LSTM(50))
        model.add(Dense(1))
        model.compile(loss="mean_squared_error", optimizer="adam")

        model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=2, batch_size=32, verbose=1)

        # Make predictions for future days
        predictions = []
        x_input = test_data[-time_step:].reshape(1, time_step, 1)
        for i in range(ttl_days):
            yhat = model.predict(x_input, verbose=0)
            predictions.append(yhat[0, 0])
            x_input = np.append(x_input, yhat.reshape(1, 1, 1), axis=1)
            x_input = x_input[:, 1:, :]

        predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
        print(predictions.tolist())
        save_model_to_db(start, end, stock_symbol, model)