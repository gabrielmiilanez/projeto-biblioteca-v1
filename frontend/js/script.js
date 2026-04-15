// 
const bookContainer = document.getElementById("booksContainer");

/// Listar livros
if (bookContainer) {
    fetch(bookURL)
        .then(res => res.json())
        .then(data => {
            data.forEach(book => {
                const div = document.createElement("div");
                div.classList.add("book");

                div.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <button onclick="goToEdit(${book.id})">Editar</button>
                    <button onclick="deleteBook(${book.id})">Excluir</button>
                `;

                bookContainer.appendChild(div);
            });
        });
}

// Redirecionar para página de edição
function goToEdit(id) {
    window.location.href = `editBook.html?id=${id}`;
}

// Deletar livro
async function deleteBook(id) {
    await fetch(`${bookURL}/${id}`, {
        method: "DELETE"
    });

    location.reload();
}