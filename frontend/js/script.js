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

                if (!book.bookImage || book.bookImage.trim() === "") {
                    book.bookImage = "https://i.pinimg.com/736x/8a/23/38/8a2338f7e7e137eed4a6c1566fcc476f.jpg";
                }

                div.innerHTML = `
                    <img class="bookImage" src="${book.bookImage}" alt="${book.title}" />
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <button class="editButton" onclick="goToEdit(${book.id})">Editar</button>
                    <button class="deleteButton" onclick="deleteBook(${book.id})">Excluir</button>
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