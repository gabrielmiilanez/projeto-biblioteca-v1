from flask import Flask, render_template
from db import db
from routes import routes

app = Flask(__name__)

from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Config do banco local
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
app.register_blueprint(routes)

# Criando banco de Dados
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')
    