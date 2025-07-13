from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
classifier = pipeline('sentiment-analysis', model='distilbert-base-uncased-finetuned-sst-2-english')

@app.route('/recommend', methods=['POST'])
def recommend():
    mood = request.json.get('mood', 'happy')
    sentiment = classifier(mood)[0]['label']
    # Dummy recommendations
    recs = {
        'POSITIVE': ['The Pursuit of Happyness', 'Chef'],
        'NEGATIVE': ['Inside Out', 'Up']
    }
    return jsonify({"sentiment": sentiment, "recommendations": recs.get(sentiment, [])})
