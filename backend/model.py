import warnings
warnings.filterwarnings("ignore")

from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the model
pipe = pipeline(model="megalaa/coptic-english-translator", trust_remote_code=True)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    coptic_text = data.get('text', '')
    
    if not coptic_text:
        return jsonify({"error": "No text provided"}), 400

    output =  pipe(coptic_text, from_bohairic=True, output_confidence=True)

    
    return output

if __name__ == '__main__':
    app.run(debug=True)