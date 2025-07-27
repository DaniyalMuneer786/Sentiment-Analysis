from flask import Flask, request, jsonify, render_template
import joblib
import json


# Initialize Flask app
app = Flask(__name__)

# Load the saved model and vectorizer
model = joblib.load("Logistic Regression_model.pkl")  # or your best model
vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Label mapping (0=Negative, 1=Neutral, 2=Positive)
label_map = {0: "Negative", 1: "Neutral", 2: "Positive"}

@app.route('/')
def home():
    return render_template('index.html')

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     text = data.get('text', '')
#     print("Received text:", text)  # <-- Debug log

#     if text.strip() == '':
#         return jsonify({"error": "Empty input"}), 400

#     # Transform input text and predict
#     text_vec = vectorizer.transform([text])
#     pred_class = model.predict(text_vec)[0]
#     label = label_map[pred_class]

#     return jsonify({"sentiment": label})


@app.route('/predict', methods=['POST'])
def predict():
    if request.is_json:
        data = request.get_json()
    else:
        data = request.get_data(as_text=True)
        data = json.loads(data)

    text = data.get('text', '')
    print("Received text:", text)

    if text.strip() == '':
        return jsonify({"error": "Empty input"}), 400

    text_vec = vectorizer.transform([text])
    pred_class = model.predict(text_vec)[0]
    label = label_map[pred_class]


    sentiment_score = {
        "Negative": 0.0,
        "Neutral": 0.5,
        "Positive": 1.0
    }.get(label, 0.5)

    return jsonify({"sentiment": label, "score": sentiment_score})

    # return jsonify({"sentiment": label})

    # return jsonify({
    #     "sentiment": label,
    #     "text_vec": {
    #         "negative": float(text_vec[0]),
    #         "neutral": float(text_vec[1]),
    #         "positive": float(text_vec[2])
    #     }
    # })

if __name__ == '__main__':
    app.run(debug=True)
