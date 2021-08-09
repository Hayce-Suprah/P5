// Récupération de l'id dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// Sélection du bouton pour ajouter au panier
const btnAjouter = document.getElementById('ajouter');

// Sélection de la class ou le HTML sera injecter
const Item = document.getElementById('Item');

// Méthode pour isoler l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
console.log(id);


function setEvent(article) {
    // Ecouter le bouton et envoyer le panier
    btnAjouter.addEventListener('click', (evenement) =>{
        
        //Permet a la page de ne pas se rafraichir quand on clique sur le bouton
        evenement.preventDefault();

        // Récupération storage
        const storage = localStorage.getItem('produits');

    
        // Quelle couleursa  étée séléctionnée
        const color = document.getElementById("selectForm").value;

        // Modication de l'objet article
        article.color = color;
        delete article.colors;
        console.log(article)

        // Si existe pas 
        if (storage === null) {
            const newStorage = [];
            newStorage.push(article);
            localStorage.setItem('produits', JSON.stringify(newStorage));
        }else{// si il existe
            let storageParse = JSON.parse(storage);
            // Véfifier qu'il n'y a pas deux fois le même produits avec la même couleurs
            const produitsExiste = storageParse.find((element) => element._id === article._id && element.color === article.color);
            if (!produitsExiste) { // Si article pas présent dans le tableau
                storageParse.push(article)
                localStorage.setItem('produits', JSON.stringify(storageParse));
            } else { // Si article déja présent
                alert('Deja present');
            }
        }

    });
}


// Récupération de l'id depuis l'API
fetch(`http://localhost:3000/api/teddies/${id}`, {method: 'GET'})
    .then((response) => { 
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Réponse de l'api non valide")
        }
    })
    .then((article) => {
        affichageArticles(article)
        setEvent(article)
    })
    .catch((error) => {
        console.log(error.message);
    });


// Injection HTML

function affichageArticles(article) {
    Item.innerHTML = `
    <div class="card">
        <img src="${article.imageUrl}" class="card-img-top" alt="" >
        <div class="card-body">
            <h5 class="card-title">${article.name}</h5>
            <p class="card-text">${article.description}</p>
            <p class="card-price">${article.price / 100}€</p>
            <select id="selectForm" class="form-select" aria-label="Default select example">
                ${article.colors.map((color, index) => `<option value="${color}" ${index === 0 ? 'selected' : ''}>${color}</option>`)}
            </select>
        </div>
    </div>
`    
}