import pandas as pd
import lightgbm as lgb
import pickle

# load dataset
data = pd.read_csv("ontario_electricity_demand.csv")

# convert date
data["date"] = pd.to_datetime(data["date"])

# sort by date
data = data.sort_values("date")

# create time features
data["hour"] = data["date"].dt.hour
data["day"] = data["date"].dt.day
data["month"] = data["date"].dt.month

# create lag features
data["lag1"] = data["hourly_average_price"].shift(1)
data["lag2"] = data["hourly_average_price"].shift(2)
data["lag24"] = data["hourly_average_price"].shift(24)

# drop missing rows
data = data.dropna()

# features
X = data[[
    "hour",
    "day",
    "month",
    "hourly_demand",
    "lag1",
    "lag2",
    "lag24"
]]

# target
y = data["hourly_average_price"]

# train model
model = lgb.LGBMRegressor(
    n_estimators=300,
    learning_rate=0.05
)

model.fit(X, y)

# save model
pickle.dump(model, open("model.pkl", "wb"))

print("Improved model trained and saved")