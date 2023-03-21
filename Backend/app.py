from __future__ import division, print_function
import sys
import os
import glob
import re
import numpy as np

from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.layers import Flatten

from flask import Flask, redirect, url_for, request, render_template
#from flask_cors import CORS
from werkzeug.utils import secure_filename
from skimage import transform
import tensorflow

app = Flask(__name__)
#CORS(app)

model = load_model("model_6ep.h5")
dog_model = load_model("model_dog_predict2.h5")

def model_predict(img_path, model):
    img=image.load_img(img_path, target_size=(256,256))
    img=np.array(img).astype("float32")/255
    img=transform.resize(img, (256,256,3))
    img=np.expand_dims(img, axis=0)

    preds=model.predict(img)
    print("Tahmin olasılıkları: ", preds)
    print("--------------------")
    preds=np.argmax(preds[0])
    print("Tahmin: ", preds)
    return preds

def dog_predict(img_path, dog_model):
    img=image.load_img(img_path, target_size=(256,256))
    img=np.array(img).astype("float32")/255
    img=transform.resize(img, (256,256,3))
    img=np.expand_dims(img, axis=0)

    preds=dog_model.predict(img)
    print("Tahmin olasılıkları: ", preds)
    print("--------------------")
    preds=np.argmax(preds[0])
    print("Tahmin: ", preds)
    return preds

@app.route('/')
def show_page():
    return render_template("loadImage.html")

@app.route('/predict', methods=("POST", "GET"))
def upload():
    print("istek geldi")
    if request.method == "POST":
        file = request.files['file']

        if file and allowed_file(file.filename):
            filename = file.filename
            print(filename)
            file.save(os.path.join(app.root_path, 'uploads', filename))
            dog_pred = dog_predict(os.path.join(app.root_path, 'uploads', filename), model)

            if(dog_pred == 1):

                preds=model_predict(os.path.join(app.root_path, 'uploads', filename), model)
                os.remove(os.path.join(app.root_path, 'uploads', filename))
                
                if preds == 0:
                    return("angry")
                if preds == 1:
                    return("happy")
                if preds == 2:
                    return("hungry")
                if preds == 3:
                    return("relaxed")
                if preds == 4:
                    return("sad")
            
            if(dog_pred == 0):
                return("cat")
            
            if(dog_pred == 2):
                return("human")

            if(dog_pred == 3):
                return("none")
            

        else:
            # Resim dosyası değil ise hata mesajı döndürülür
            return "Hatalı dosya türü", 400




# İzin verilen dosya türleri tanımlanır
ALLOWED_EXTENSIONS = {'jpg', 'jpeg'}

def allowed_file(filename):
    # Dosya adının uzantısı alınır
    ext = filename.rsplit('.', 1)[1].lower()

    # Uzantı, izin verilen dosya türleri arasında ise True döndürülür
    return '.' in filename and ext in ALLOWED_EXTENSIONS

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)