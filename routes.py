from flask import Blueprint, request, jsonify
from db import db
from models import Book

routes = Blueprint("routes", __name__)

#Criando rota para página inicial
@routes.route("/")
def home():
    return "API Flask is running"

#Criar novo livro
@routes.route("/books", methods=["POST"])
def create_book():
    data = request.get_json()

    book = Book(
        title=data["title"],
        author=data["author"],
        description=data.get("description")
    )

    db.session.add(book)
    db.session.commit()

    return jsonify(book.to_dict()), 201

# Listar livros
@routes.route("/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    return jsonify([book.to_dict_brief() for book in books])

# Detalhar livros
@routes.route("/books/<int:id>", methods=["GET"])
def get_books_detailed(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

# Buscar por ID
@routes.route("/books/<int:id>", methods=["GET"])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

# Deletar
@routes.route("/books/<int:id>", methods=["DELETE"])
def delete_book(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    
    return jsonify({"message": "Livro deletado"})