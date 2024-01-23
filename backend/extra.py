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


combined_args = sys.argv[1:]
start, end, stock_symbol = combined_args

def predict_stock_prices(start,end,stock_symbol):
    df = yf.download(stock_symbol+".NS", start, end)
    df1=df.reset_index()['Close']

    scaler= MinMaxScaler(feature_range=(0,1))
    df1=scaler.fit_transform(np.array(df1).reshape(-1,1))

    training_size= int(len(df1)*0.65)
    test_size= len(df1)-training_size
    train_data, test_data= df1[0:training_size, :], df1[training_size:len(df1), :1]


    def create_dataset(dataset, time_step=1):
        dataX, dataY=[],[]
        for i in range(len(dataset)-time_step-1):
            a= dataset[i:(i+time_step),0]
            dataX.append(a)
            dataY.append(dataset[i+time_step, 0])
        return np.array(dataX), np.array(dataY)

    time_step=100
    X_train, y_train = create_dataset(train_data, time_step)
    X_test, y_test= create_dataset(test_data, time_step)
    print(X_train.shape,y_train.shape,X_test.shape,y_test.shape)

    print(X_train.shape)
    X_train= X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    print(X_train.shape)
    X_test= X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
    print(X_test.shape)

    model= Sequential()
    model.add(LSTM(50, return_sequences= True, input_shape=(100,1)))
    model.add(LSTM(50, return_sequences= True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss= "mean_squared_error", optimizer= "adam")

    model.summary()

    model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=100, batch_size=32, verbose=1)

    train_predict= model.predict(X_train)
    test_predict= model.predict(X_test)
    print(train_predict.shape, " next ", test_predict.shape)

    # print(test_predict)
    train_predict= scaler.inverse_transform(train_predict)
    test_predict= scaler.inverse_transform(test_predict)
    # print(test_predict)

    import math
    from sklearn.metrics import mean_squared_error
    print(math.sqrt(mean_squared_error(y_train, train_predict)))
    print(math.sqrt(mean_squared_error(y_test, test_predict)))

    look_back=100
    trainPredictPlot= np.empty_like(df1)
    # print(trainPredictPlot)
    trainPredictPlot[:,:]= np.nan
    # print(trainPredictPlot)
    trainPredictPlot[look_back:len(train_predict)+look_back, :]= train_predict
    # print(trainPredictPlot[99:])
    testPredictPlot= np.empty_like(df1)
    testPredictPlot[:,:]= np.nan
    testPredictPlot[len(train_predict)+(look_back*2)+1:len(df1)-1, :]= test_predict

    plt.figsize=(20,10)
    df2=df1[-len(test_predict):]
    print(df2.shape)
    print(test_predict.shape)

    plt.plot(scaler.inverse_transform(df2), label="Actual Stock Price")
    plt.plot(test_predict, label="Predicted Stock Price")
    plt.legend()
    plt.show()

    x_input = test_data[-time_step:].reshape(1, time_step, 1)

    # Generate predictions for the next 15 days
    predictions = []
    ttldays = 30

    for i in range(ttldays):
        # Predict the next day
        yhat = model.predict(x_input, verbose=0)
        
        # Append the prediction to the results
        predictions.append(yhat[0, 0])
        
        # Update the input for the next prediction
        x_input = np.append(x_input, yhat.reshape(1, 1, 1), axis=1)
        x_input = x_input[:, 1:, :]

    predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
    return predictions

predictions= predict_stock_prices(start,end,stock_symbol)
print(predictions)
# next_ttldays = pd.date_range(df.index[-1] + pd.DateOffset(1), periods=ttldays)
# predicted_df = pd.DataFrame(predictions, index=next_ttldays, columns=["Predicted_Close"])
# plt.figure(figsize=(12, 6))
# plt.plot(df.index, df['Close'], label='Actual Stock Price')
# plt.plot(predicted_df.index, predicted_df['Predicted_Close'], label='Predicted Stock Price', color='red')
# plt.title('Predicted Stock Price for next 30 days')
# plt.xlabel('Date')
# plt.ylabel('Stock Price')
# plt.legend()
# plt.show()



















# # Function to predict stock prices for the next 'ttldays' days
# def predict_stock_prices(stock_symbol, start, end, ttldays=30):
#     df = yf.download(stock_symbol + ".NS", start, end)
#     df1 = df.reset_index()['Close']

#     scaler = MinMaxScaler(feature_range=(0, 1))
#     df1 = scaler.fit_transform(np.array(df1).reshape(-1, 1))

#     training_size = int(len(df1) * 0.65)
#     test_size = len(df1) - training_size
#     train_data, test_data = df1[0:training_size, :], df1[training_size:len(df1), :1]

#     def create_dataset(dataset, time_step=1):
#         dataX, dataY = [], []
#         for i in range(len(dataset) - time_step - 1):
#             a = dataset[i:(i + time_step), 0]
#             dataX.append(a)
#             dataY.append(dataset[i + time_step, 0])
#         return np.array(dataX), np.array(dataY)

#     time_step = 100
#     X_train, y_train = create_dataset(train_data, time_step)
#     X_test, y_test = create_dataset(test_data, time_step)

#     X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
#     X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

#     model = Sequential()
#     model.add(LSTM(50, return_sequences=True, input_shape=(100, 1)))
#     model.add(LSTM(50, return_sequences=True))
#     model.add(LSTM(50))
#     model.add(Dense(1))
#     model.compile(loss="mean_squared_error", optimizer="adam")

#     model.summary()

#     model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=2, batch_size=32, verbose=1)

#     test_data = df1[len(df1) - time_step:].reshape(1, time_step, 1)

#     # Generate predictions for the next 'ttldays' days
#     predictions = []

#     for _ in range(ttldays):
#         yhat = model.predict(test_data, verbose=0)
#         predictions.append(yhat[0, 0])

#         # Update the input for the next prediction
#         test_data = np.append(test_data, yhat.reshape(1, 1, 1), axis=1)
#         test_data = test_data[:, 1:, :]

#     # Inverse transform to get the original scale of stock prices
#     predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))

#     return predictions

# # Example usage
# # stock_symbol = "BEL"
# # end = pd.to_datetime('today').strftime('%Y-%m-%d')
# # start = pd.to_datetime('today') - pd.DateOffset(days=1000)
# predictions = predict_stock_prices(stock_symbol, start, end)

# # Print the array of predicted stock prices for the next 30 days
# print(predictions)









