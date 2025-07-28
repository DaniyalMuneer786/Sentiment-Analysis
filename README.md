# 🎬 YouTube Sentiment Analysis Web Application

A web-based application that performs sentiment analysis on user-submitted text, classifying it as **Positive**, **Negative**, or **Neutral**. It uses machine learning (Logistic Regression) and a TF-IDF vectorizer to analyze the emotional tone of text input.

---

## 🎯 Objective

- Allow users to enter a sentence or comment.
- Analyze the text using a machine learning model.
- Display the sentiment (positive, negative, or neutral) with a clear and interactive UI.

---

## 🛠️ Technologies Used

### 🔹 Frontend
- **HTML** – Page structure  
- **CSS** – Styling the interface  
- **JavaScript** – Handling user input, UI update, and API communication  

### 🔹 Backend
- **Python** – Logic and ML processing  
- **Flask** – Web framework for request handling  
- **Joblib** – For loading ML models  

### 🔹 Machine Learning
- **Model:** Logistic Regression (or others: Naive Bayes, SVM, XGBoost)  
- **Vectorizer:** TF-IDF  
- **Libraries:** `scikit-learn`, `joblib`, `Flask`, `nltk`

---

## 📁 Project Structure

sentiment_analysis_project/
│
├── static/
│ ├── css/styles.css
│ └── js/script.js
│
├── templates/
│ └── index.html
│
├── app.py # Flask backend
├── Logistic_Regression_model.pkl
├── tfidf_vectorizer.pkl

yaml
Copy
Edit

---

## 🚀 How It Works

1. **User Input:**
   - User types a sentence and clicks **"Analyze"**.
2. **Backend Processing:**
   - Flask receives the text and converts it using TF-IDF.
   - The ML model predicts a sentiment label.
3. **Result Display:**
   - Flask sends the sentiment result to the frontend.
   - JavaScript updates the UI dynamically with the output.

---

## 📊 Model Performance

| Model              | Accuracy | Positive F1 | Neutral F1 | Negative F1 |
|-------------------|----------|-------------|------------|-------------|
| Naive Bayes        | 70%      | 72%         | 60%        | 82%         |
| SVM                | 80%      | 87%         | 76%        | 90%         |
| Logistic Regression| 80%      | 85%         | 74%        | 88%         |
| Random Forest      | 90%      | 85%         | 79%        | 95%         |
| XGBoost            | 90%      | 87%         | 83%        | 95%         |

> ✅ **Best Performing Models:** Random Forest and XGBoost

---

## ✅ Conclusion

This project demonstrates how machine learning can be used for real-time sentiment analysis. It’s useful for analyzing feedback, social media posts, or YouTube comments quickly and accurately.

---

Let me know if you'd also like:

requirements.txt file

Help uploading to GitHub

README files for other projects

I'm here to assist!
