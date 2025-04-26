import coremltools as ct
import tensorflow as tf

model = tf.keras.models.load_model("gym_classifier_model.h5")

coreml_model = ct.convert(
    model,
    source="tensorflow",
    convert_to="neuralnetwork",
    inputs=[ct.ImageType(shape=(1, 150, 150, 3), scale=1/255.0)]
)

coreml_model.save("GymClassifier.mlmodel")