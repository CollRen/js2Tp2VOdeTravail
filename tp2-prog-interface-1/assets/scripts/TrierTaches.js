import App from "./App.js";
export default class TrierTaches extends App {
  constructor(el) {
    super();
    this._el = el;  // action
    this._elTaches = document.querySelector("[data-js-taches]");
    this._elTemplate = document.querySelector("[template_tache__liste]");
    this.init();
  }

  /**
   * Initialise les comportements
   */
  init() {
    this._el.addEventListener(
      "click",
      function (e) {
        let propriete = e.target.dataset.jsTrier;
        this.appelFetch(propriete);
      }.bind(this)
    );
  }

  /**
   * Réordonne le tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
   * @param {String} propriete
   */
  trieTaches(tableau) {
    // Réinjecte les tâches dans l'ordre
    this._elTaches.innerHTML = "";
for (let i = 0, l = tableau.length; i < l; i++) {
      this.injecteTache(i);
    }
  }

  appelFetch(propriete) {
  let data = {
    action: "getTachesTriees",
    sort: propriete,
};
console.log(data);
  let oOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
};
  fetch("requetes/requetesAsync.php", oOptions)
    .then(function (reponse) {
      if (reponse.ok) return reponse.json();
      else throw new Error("La réponse n'est pas OK");
    })
    .then(
      function (data) {
        console.log(data);
        if (data && data != "Erreur query string") {
          
          this.trieTaches(data);
        } else {
          console.log("Erreur query string");
        }
      }.bind(this)
    )
    .catch(function (erreur) {

      console.log(
        `Il y a eu un problème avec l'opération fetch: ${erreur.message}`
      );
    });
}
}
