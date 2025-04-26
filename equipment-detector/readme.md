## Overview
The equipment detector is a tensorflow model that predict which equipment the user is looking at based on a picture

## Initial configurations

- create `python3 -m venv venv`
- load `python3 -m source venv/bin/activate`
- install dependencies `pip install -r requirements.txt`


## Executing

You will need a dataset of images for traininig and evaluation the model
The folder structure on the root of /equipment-detector should look like this:
- dataset/train: around 150 images of each equipment
- dataset/val: around 30 images of each equipment

Once you have all images configured. Run:

`python3 src/train-model.py`

