from flask import Flask, request
from google.cloud import vision
from flask_cors import CORS
import os , base64
from difflib import SequenceMatcher
from roboflow import Roboflow
from io import BytesIO
from PIL import Image

app = Flask(__name__)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="api-path"
rf = Roboflow(api_key="api-key")
project = rf.workspace().project("7segmentrecognition_v3")
CORS(app, origins=['http://localhost:3001', 'http://localhost:3000'])

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

@app.route('/api/ssr', methods=['POST'])
def digit_api():
    content = request.json['imageSrc'][23:]
    model = project.version(2).model
    Image.open(BytesIO(base64.b64decode(content))).save('output.png')
    results = model.predict("output.png", confidence=50, overlap=50)
    results = results.json()
    pred_sorted = sorted(results["predictions"], key=lambda x: x['y'])
    pred_list = []
    for i in range(len(pred_sorted)):
        if pred_sorted[i]['class'] == '#' :
            continue

        group = [(pred_sorted[i]['class'], pred_sorted[i]['x'])]

        for j in range(i + 1, len(pred_sorted)):
            if abs(pred_sorted[i]['y'] - pred_sorted[j]['y']) < 10:
                if pred_sorted[j]['class'].isdigit():
                    group.append((pred_sorted[j]['class'], pred_sorted[j]['x']))
                    pred_sorted[j]['class'] = '#'
        pred_list.append(group)

    keys = ['sysMmHg', 'diaMmHg', 'pulseRate']
    values = []
    for pred in pred_list:
        x_sort = sorted(pred, key=lambda x: x[1])
        val = ""
        for tuple in x_sort:
            val = ''.join([val, tuple[0]])
        values.append(val)    

    data = dict(zip(keys, values))
    print(data)
    return data

@app.route('/api/vision', methods=['POST'])
def vision_api():
    client = vision.ImageAnnotatorClient()
    content = request.json['image'][23:]
    image = vision.Image(content=base64.b64decode(content))
    response = client.text_detection(image=image)
    
    fields = {
        'Surname Nom': 'surname', 
        'Firstnames Prénoms': 'firstNames', 
        'Nationality/Nationalite': 'nationality',
        'Sex/Sexe': 'sex',
        'Date of Birth/Date de Naissance': 'dateOfBirth',
        'Height/Taille(m)': 'height',
        'Place of Issuance/Lieu de délivrance': 'placeOfIssuance',
        'Personal ID Number': 'personalIdNumber'
    }

    values = {}
    data = [text.description for text in response.text_annotations]
    print(data)
    lines = data[0].split('\n')
    for i in range(len(lines)):
        line = lines[i].strip()
        for field, label in fields.items():
            if similar(field.lower(), line.lower()) >= 0.8:
                value = lines[i+1].strip()
                values[label] = value
    return values

if __name__ == '__main__':
    app.run()