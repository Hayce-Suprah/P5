// Acceuil.js

// function affichageArticles + boucle article, fonction qui affiche les articles

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



// Produits.js

// function setEvent, permet d'ajouter l'article au panier et vérifier si l'article est déjà présent ou si la couleur est déjà présente


function setEvent(article) {
    // Ecouter le bouton et envoyer le panier
    btnAjouter.addEventListener('click', (evenement) =>{
        
        //Permet a la page de ne pas se rafraichir quand on clique sur le bouton
        evenement.preventDefault();

        // Récupération storage
        const storage = localStorage.getItem('produits');

    
        // Quelle couleurs a  étée séléctionnée
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
            alert("Article ajouter au panier");
        }else{// si il existe
            let storageParse = JSON.parse(storage);
            
            //Véfifier qu'il n'y a pas deux fois le même produits avec la même couleurs
            const produitsExiste = storageParse.find((element) => element._id === article._id);
            if (produitsExiste) { // Si article pas présent dans le tableau
                storageParse.push(article)
                localStorage.setItem('produits', JSON.stringify(storageParse));
                alert("Article ajouter au panier");
            } else { // Si article déja présent
                alert('Deja present');
            }
        }

    });
}

// fonction affichageArticle, fonction qui affiche l'article grâce a son ID

function affichageArticle(article) {
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


// Panier.js

// function checkInputs, fonction qui permet de vérifier les RegExp mis en place dans les fonctions validationEmail et validationText pour un bon envoi du formulaire.


function checkInputs() {
    const usernameValue = username.value.trim();
    const nameValue = name.value.trim();
    const adresseValue = adresse.value.trim();
    const villeValue = ville.value.trim();
    const emailValue = email.value.trim();

    if(!validationText(usernameValue, nameValue, villeValue, adresseValue)){
        alert ("Votre Prénom, Nom, ville ou adresse n'est pas valide");    
    }
    if(!validationEmail(emailValue)) {
        alert ("Email incorrect");
    }

    if(validationText(usernameValue) && validationText(nameValue) && validationText(villeValue) && validationText(adresseValue) && validationEmail(emailValue)){
        return true;
    }
};

function validationEmail(email) {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/.test(email)
};
function validationText(text) {
    return /^[a-zA-Z0-9ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ\-\s]{2,}$/.test(text)
};