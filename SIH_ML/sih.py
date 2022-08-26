import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from flask import *
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
app.secret_key = 'secret key'






@app.route('/', methods=['GET'])
# @cors.cross_origin()
def index():
    if request.method == 'GET':
        data = "data_sih.csv"

        df = pd.read_csv(data)
        decoded = list(df.Timer.unique())
        le = LabelEncoder()
        df['Task_Name'] = le.fit_transform(df['Task_Name'])
        df['Timer'] = le.fit_transform(df['Timer'])

        # Split the data into train and test sets
        X = df.drop(['Timer'], axis=1)
        y = df.Timer
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

        # Create a KNN classifier model
        knn = KNeighborsClassifier(n_neighbors=10)
        knn.fit(X_train, y_train)

        task = request.args['task']
        print(task)
        task = le.fit_transform([task])
        prediction = list(knn.predict([task]))
        print(decoded[prediction[0]])

        decodedTime = "{}".format(decoded[prediction[0]])
        response = {
            "time":decodedTime
        }
        # return jsonify(response)
        return render_template('http://127.0.0.1:5000/home.html', data=response)
        # http://127.0.0.1:5000?task=fsdf
        

if __name__ == '__main__':
    app.run(debug=True)