// Sélection de mes id dans le DOM

const prenom = document.getElementById("name");
const prix = document.getElementById("price");
const id = document.getElementById("order_id");
const btn_home = document.getElementById("btn_home");

const recuperationLocalStorage = JSON.parse(localStorage.getItem("order"));
console.log(recuperationLocalStorage);

// Affichage prénom de la personne + prix total
prenom.innerHTML = recuperationLocalStorage.contact.firstName;
prix.innerHTML = recuperationLocalStorage.price;
id.innerHTML = recuperationLocalStorage.orderId;

btn_home.addEventListener("click", (evenement) => {
  localStorage.clear();
  window.location.href = "index.html";
});
