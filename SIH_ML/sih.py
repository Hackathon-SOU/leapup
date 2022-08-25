import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from flask import *


app = Flask(__name__)
app.secret_key = 'secret key'


data = "data_sih.csv"
df = pd.read_csv(data)
df
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

# Predict the test set results
# y_pred = knn.predict(X_test)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        task = request.form['task']
        task = le.fit_transform([task])
        prediction = knn.predict(task)
        return render_template('home.html', prediction=prediction)
    else:
        return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)