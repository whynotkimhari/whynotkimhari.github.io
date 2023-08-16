import tensorflow as tf
import tensorflowjs as tfjs
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Dropout,Conv2D,MaxPooling2D,Flatten,BatchNormalization
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical
import tensorflow.keras.backend as K

(x_train,y_train),(x_test,y_test) = mnist.load_data()

CLASSES = 10
BATCH_SIZE = 10
EPOCHS = 10
SIZE_ROWS = 28 
SIZE_COLS = 28
INPUT_SHAPE = (SIZE_ROWS,SIZE_COLS,1)

x_train = x_train.astype(float) / 255
x_test = x_test.astype(float) / 255

y_train = to_categorical(y_train, num_classes = CLASSES, dtype = 'float32')
y_test = to_categorical(y_test, num_classes = CLASSES, dtype = 'float32')

if K.image_data_format() =='channels_first':
    x_train = x_train.reshape(x_train.shape[0],1,SIZE_ROWS,SIZE_COLS)
    x_test = x_test.reshape(x_test.shape[0],1,SIZE_ROWS,SIZE_COLS)
    input_shape = (1,SIZE_ROWS,SIZE_COLS)
else:
    x_train = x_train.reshape(x_train.shape[0],SIZE_ROWS,SIZE_COLS,1)
    x_test = x_test.reshape(x_test.shape[0],SIZE_ROWS,SIZE_COLS,1)
    input_shape = (SIZE_ROWS,SIZE_COLS,1)

model = Sequential()
model.add(Conv2D(32, kernel_size = 3, activation='relu', input_shape = input_shape))
model.add(MaxPooling2D())
model.add(Conv2D(32, kernel_size = 3, activation='relu'))
model.add(BatchNormalization())
model.add(Conv2D(32, kernel_size = 5, strides=2, padding='same', activation='relu'))
model.add(BatchNormalization())
model.add(Dropout(0.4))
model.add(Conv2D(64, kernel_size = 3, activation='relu'))
model.add(BatchNormalization())
model.add(Conv2D(64, kernel_size = 3, activation='relu'))
model.add(BatchNormalization())
model.add(Conv2D(64, kernel_size = 5, strides=2, padding='same', activation='relu'))
model.add(BatchNormalization())
model.add(Dropout(0.4))
model.add(Flatten())
model.add(Dropout(0.4))
model.add(Dense(10, activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(x_train,y_train,batch_size=BATCH_SIZE,epochs=EPOCHS,validation_data=(x_test,y_test))

model_json = model.to_json()
with open("model.json","w") as json_file:
    json_file.write(model_json)
model.save_weights("models.h5")

path_to_save = "your path to save"

tfjs.converters.save_keras_model(model,path_to_save)