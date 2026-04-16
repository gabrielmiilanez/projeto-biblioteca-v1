from flask import Blueprint, request, jsonify
from backend.models import book
from database.db import db
from models.book import Book

routes = Blueprint("routes", __name__)

#Criando rota para página inicial
@routes.route("/", methods=["GET"])
def home():
    return "a API está funcionando! Acesse /books para ver os livros cadastrados."

#Criar novo livro
@routes.route("/books", methods=["POST"])
def create_book():
    data = request.get_json()

    if not data or "title" not in data or "author" not in data:
        return jsonify({"error": "título e autor são obrigatórios"}), 400

    book = Book(
    title=data["title"],
    author=data["author"],
    bookImage=data.get("bookImage"),
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
@routes.route("/books/<int:id>/detailed", methods=["GET"])
def get_books_detailed(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

# Buscar por ID
@routes.route("/books/<int:id>", methods=["GET"])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

# Editar
@routes.route("/books/<int:id>", methods=["PUT"])
def update_book(id):
    book = Book.query.get_or_404(id)
    data = request.get_json()

    if not data:
        return jsonify({"error": "dados inválidos"}), 400

    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.bookImage = data.get("bookImage", book.bookImage)
    book.description = data.get("description", book.description)

    db.session.commit()
    
    return jsonify(book.to_dict())

# Deletar
@routes.route("/books/<int:id>", methods=["DELETE"])
def delete_book(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    
    return jsonify({"message": "Livro deletado"}), 200