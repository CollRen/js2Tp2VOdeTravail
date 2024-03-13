import App from "./App.js";
class TacheService {
  _elTemplateTache;
  _elDetails;
  constructor() {
    this._elTemplateTache = document.querySelector("[data-template-details]");
    this._elDetails = document.querySelector("[data-js-tache-detail]");
    this.getTachesDetail = this.getTachesDetail.bind(this);
  }

  /**
   * Récupère en asynchrone les taches
   * @param {String} id
   */
  getTachesDetail(id) {
    //console.log(id);
    let data = {
      action: "getTacheDetail",
      id: id,
    };
    let oOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(oOptions);
    fetch("requetes/requetesAsync.php", oOptions)
      .then(function (reponse) {
        if (reponse.ok) return reponse.json();
        else throw new Error("La réponse n'est pas OK");
      })
      .then(
        function (data) {
          console.log(data);
          if (data && data != "Erreur query string") {

          //this.injecteDetail(data);
          } else {
            console.log('Erreur query string');
          }

        }.bind(this)
      )
      .catch(function (erreur) {
        console.log(
          `Il y a eu un problème avec l'opération fetch: ${erreur.message}`
        );
      });
  }
  injecteDetail(datas) {
    console.log(datas);

    let elCloneTemplate = this._elTemplate.cloneNode(true);


    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(
      "{{ description }}",
      datas.description
    );
    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(
      "{{ importance }}",
      datas.importance
    );
    let elNouvelleTache = document.importNode(elCloneTemplate.content, true);
    console.log(elNouvelleTache);
    this._elListe.append(elNouvelleTache); // Ajouter un noeud

    // Lance les comportements de la nouvelle tâche injectée
    new Tache(this._elListe.lastElementChild);
  }
}
export const { getTachesDetail } = new TacheService();
