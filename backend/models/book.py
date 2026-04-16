from database.db import db

# Criando Modelo de Classe para Livro
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    bookImage = db.Column(db.String(300), nullable=True)
    description = db.Column(db.Text, nullable=True)

# Métodos para converter o modelo em dicionário de forma detalhada
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "bookImage": self.bookImage,
            "description": self.description
        }
    
# Métodos para converter o modelo em dicionário de forma resumida
    def to_dict_brief(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "bookImage": self.bookImage 
        }
