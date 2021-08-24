// Récupération de l'id dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// Sélection du bouton pour ajouter au panier
const btnAjouter = document.getElementById("ajouter");

// Sélection de la class ou le HTML sera injecter
const Item = document.getElementById("Item");

// Méthode pour isoler l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
console.log(id);

// Récupération de l'id depuis l'API
fetch(`http://localhost:3000/api/teddies/${id}`, { method: "GET" })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Réponse de l'api non valide");
    }
  })
  .then((article) => {
    affichageArticle(article);
    setEvent(article);
  })
  .catch((error) => {
    console.log(error.message);
  });
