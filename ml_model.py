import pickle
import pandas as pd

model = pickle.load(open("model.pkl", "rb"))

def predict_price(date, horizon):

    predictions = []

    current = pd.to_datetime(date)

    # initial lag values (dummy starting values)
    lag1 = 50
    lag2 = 50
    lag24 = 50

    for i in range(horizon):

        hour = current.hour
        day = current.day
        month = current.month
        demand = 15000

        X = [[hour, day, month, demand, lag1, lag2, lag24]]

        price = model.predict(X)[0]

        predictions.append(round(float(price),2))

        # update lag values
        lag24 = lag2
        lag2 = lag1
        lag1 = price

        current += pd.Timedelta(hours=1)

    return predictions