let bookId = new URLSearchParams(window.location.search).get("id");

// Carregar dados do livro para edição
async function loadBookData() {
    
    let response = await fetch(`${bookURL}/${bookId}`);

    if (response.ok) {
        let data = await response.json();

        document.getElementById("title").value = data.title;
        document.getElementById("author").value = data.author;
        document.getElementById("description").value = data.description;
    } else {
        document.getElementById("message").innerText =
            "Erro ao carregar dados do livro.";
    }
}

window.onload = loadBookData;

// Enviar dados editados para o backend
async function submitEdition(event)
{
    event.preventDefault();

    let data = {
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                description: document.getElementById("description").value
            };

    let response = await fetch(`${bookURL}/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) 
    {
        document.getElementById("message").innerText =
            "Livro atualizado com sucesso!";
    } else {
        document.getElementById("message").innerText =
            "Erro ao atualizar livro.";
    }
}