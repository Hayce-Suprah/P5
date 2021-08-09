
// Appel de l'API

fetch('http://localhost:3000/api/teddies')
    .then((response) => { 
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Réponse de l'api non valide")
        }
    })
    .then((articles) => {
        affichageArticles(articles)
    })
    .catch((error) => {
        console.log(error.message);
    });

// function affichageArticles + boucle article

function affichageArticles(articles){

    const itemList = document.getElementById('itemList')

    for(article of articles){
        itemList.innerHTML += `
        <div class="card">
        <img src="${article.imageUrl}" class="card-img-top" alt="" >
        <div class="card-body">
          <h5 class="card-title">${article.name}</h5>
          <p class="card-text">${article.description}</p>
          <p class="card-price">${article.price / 100}€</p>
          <p class="card-colors">${article.colors}</p>
          <a href="produit.html?id=${article._id}" class="btn btn-primary">Voir le produit</a>
        </div>
      </div>`
    }
};