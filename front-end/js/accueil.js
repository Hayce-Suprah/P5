// Appel de l'API

fetch("http://localhost:3000/api/teddies")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Réponse de l'api non valide");
    }
  })
  .then((articles) => {
    affichageArticles(articles);
  })
  .catch((error) => {
    console.log(error.message);
  });

