// Adicionar livro
const form = document.getElementById("bookForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            description: document.getElementById("description").value
        };

        const response = await fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        document.getElementById("message").innerText =
            "Livro criado com sucesso!";
    });
}

// Listar livros
const container = document.getElementById("booksContainer");

if (container) {
    fetch("/books")
        .then(res => res.json())
        .then(data => {
            data.forEach(book => {
                const div = document.createElement("div");
                div.classList.add("book");

                div.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <button onclick="deleteBook(${book.id})">Excluir</button>
                `;

                container.appendChild(div);
            });
        });
}

// Deletar livro
async function deleteBook(id) {
    await fetch(`/books/${id}`, {
        method: "DELETE"
    });

    location.reload();
}