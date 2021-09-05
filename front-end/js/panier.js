


// Récupération du local Storage

const getLocalStorage = localStorage.getItem("produits");
let panier = JSON.parse(getLocalStorage);
console.log(panier)

// Déclaration de ma variable ou se trouvera mon tableau

const tableau = document.getElementById("tableau");

// Injection dans le Html + .map pour boucler sur article du tableau panier

tableau.innerHTML = `
    ${panier.map(function (article) {
      return `<tr>
            <td>${article.name}</td>
            <td>${article.color}</td>
            <td>${article.price / 100}€</td>
            <td><button class="btn btn-danger" id="btnsupp">Supprimer</button></td>
          </tr>`;
    }).join('')}
`;
// Déclaration de ma variable pour cibler les boutons + boucle for of de mon bouton dans mes boutons avec compteur (index) + évenement sur les btn
// avec la fonction .splice pour vider une partie du tableau, ensuite renvoi du localStorage en .JSON et raffraichissement de la page avec.reload

const btns = document.querySelectorAll("#btnsupp");

for (const [index, btn] of btns.entries()) {
  btn.addEventListener("click", () => {
    panier.splice(index, 1);

    if(panier.length === 0){
      localStorage.removeItem("produits");
    }else{
      localStorage.setItem("produits", JSON.stringify(panier));
    }

  window.location.reload();
  });
}

// Déclaration de ma variable pour pouvoir y mettre tout les prix présents dans le panier

let tableauDePrix = [];

// Allez chercher les prix dans le panier

for (let i = 0; i < panier.length; i++) {
  let prixDansLePanier = panier[i].price;

  //Mettre tous les prix récupérer dans un tableau
  tableauDePrix.push(prixDansLePanier);
  console.log(tableauDePrix);
}

// Additionner tous les prix avec la function .reduce et ajouter une valeur initiale pour ne pas, ne rien avoir quand le panier est vide

const reducer = (accumulator, currentValue) => accumulator + currentValue;
let prixTotal = tableauDePrix.reduce(reducer, 0);
console.log(prixTotal);

// Séléction de l'élément pour afficher mon prix total
const Total = document.getElementById("total");

Total.innerHTML = `

    <p>Prix total de votre panier est ${prixTotal / 100}€</p>

`;

// Séléction du bouton sur lequel ce passera mon evenement

const form = document.getElementById("form_container");
if(panier !== undefined && panier.length>0){
  form.style.display = "block";
}

const username = document.getElementById("prenom");
const name = document.getElementById("nom");
const adresse = document.getElementById("adresse");
const ville = document.getElementById("ville");
const email = document.getElementById("email");

// Action sur l'envoi du formulaire  + method POST pour fetch

form.addEventListener("submit", (evenement) => {
  evenement.preventDefault();

  if (checkInputs()) {
    // Récupération localstorage

    const getLocal = JSON.parse(localStorage.getItem("produits"));

    // boucle sur les item de mon localStorage en retournant les id

    const ids = getLocal.map((item) => {
      return item._id;
    });
    
    let contact = new Contact (username.value, name.value, adresse.value, ville.value, email.value);
    console.log(contact)
    // Déclaration du body pour POST fetch
    const body = {
      contact, 
      products: ids,
    };
    console.log(body);
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("http://localhost:3000/api/teddies/order", init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Réponse de l'api non valide");
        }
      })
      .then((data) => {
        localStorage.clear();
        data.price = prixTotal / 100;
        localStorage.setItem("order", JSON.stringify(data));
        window.location.href = "confirmation.html";
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    alert("Problème de formulaire");
  }
});

