// Adicionar um novo livro

async function submitCreation(event)
{
    event.preventDefault();

    let data = {
                title: document.getElementById("title").value,
                author: document.getElementById("author").value,
                bookImage: document.getElementById("bookImage").value,
                description: document.getElementById("description").value
            };

    let response = await fetch(bookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) 
    {
        document.getElementById("message").innerText =
            "Livro criado com sucesso!";
    } else {
        document.getElementById("message").innerText =
            "Erro ao criar livro.";
    }

}