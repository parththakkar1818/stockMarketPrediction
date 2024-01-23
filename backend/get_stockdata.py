import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from matplotlib.dates import DateFormatter
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import sys
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
import math
from sklearn.metrics import mean_squared_error
import json

# combined_args = sys.argv[1:]
# start, end, stock_symbol = combined_args

combined_args = sys.argv[1]
# print(combined_args)
start,end,stock_symbol = combined_args.split(',')
print(start,end,stock_symbol)

def predict_stock_prices(start,end,stock_symbol,ttldays = 30):
    df = yf.download(stock_symbol+".NS", start, end)
    df1=df.reset_index()['Close']

    scaler= MinMaxScaler(feature_range=(0,1))
    df1=scaler.fit_transform(np.array(df1).reshape(-1,1))

    training_size= int(len(df1)*0.75)
    test_size= len(df1)-training_size
    train_data, test_data= df1[0:training_size, :], df1[training_size:len(df1), :1]


    def create_dataset(dataset, time_step=1):
        dataX, dataY=[],[]
        for i in range(len(dataset)-time_step-1):
            a= dataset[i:(i+time_step),0]
            dataX.append(a)
            dataY.append(dataset[i+time_step, 0])
        return np.array(dataX), np.array(dataY)

    # time_step=100
    time_step=test_size-5

    X_train, y_train = create_dataset(train_data, time_step)
    X_test, y_test= create_dataset(test_data, time_step)
    # print(X_train.shape,y_train.shape,X_test.shape,y_test.shape)

    # print(X_train.shape)
    X_train= X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    # print(X_train.shape)
    X_test= X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
    # print(X_test.shape)

    model= Sequential()
    model.add(LSTM(50, return_sequences= True, input_shape=(time_step,1)))
    model.add(LSTM(50, return_sequences= True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss= "mean_squared_error", optimizer= "adam")

    # model.summary()

    model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100, batch_size=32, verbose=1)

    train_predict= model.predict(X_train)
    test_predict= model.predict(X_test)
    # print(train_predict.shape, " next ", test_predict.shape)

    train_predict= scaler.inverse_transform(train_predict)
    test_predict= scaler.inverse_transform(test_predict)

    # print(math.sqrt(mean_squared_error(y_train, train_predict)))
    # print(math.sqrt(mean_squared_error(y_test, test_predict)))

    look_back=time_step
    trainPredictPlot= np.empty_like(df1)
    trainPredictPlot[:,:]= np.nan
    trainPredictPlot[look_back:len(train_predict)+look_back, :]= train_predict
    testPredictPlot= np.empty_like(df1)
    testPredictPlot[:,:]= np.nan
    testPredictPlot[len(train_predict)+(look_back*2)+1:len(df1)-1, :]= test_predict

    df2=df1[-len(test_predict):]
    # print(df2.shape)
    # print(test_predict.shape)

    x_input = test_data[-time_step:].reshape(1, time_step, 1)

    predictions = []
    for i in range(ttldays):
        yhat = model.predict(x_input, verbose=0)
        predictions.append(yhat[0, 0])
        x_input = np.append(x_input, yhat.reshape(1, 1, 1), axis=1)
        x_input = x_input[:, 1:, :]

    predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    return predictions.tolist()

predictions= predict_stock_prices(start,end,stock_symbol)
# print(predictions)
print(json.dumps(predictions))
# print(json.dumps(predictions), end='')