import sys
import json
import pickle
import pandas as pd


with open('chutiya_model.pkl', 'rb') as f:
    model = pickle.load(f)


input_data = json.loads(sys.argv[1])


features = [
    "Intelligence Level",
    "Argument Type",
    "Overconfident About Unknowns",
    "Social Behavior",
    "Response to Being Proven Wrong",
    "Falls for Obvious Scams",
    "Uses Stupid Words Often",
    "Gullible",
    "Decisions Based on WhatsApp University"
]
input_df = pd.DataFrame([input_data], columns=features)

# Make prediction
prediction = model.predict(input_df)[0]

# Output result as JSON
print(json.dumps({"prediction": int(prediction)}))