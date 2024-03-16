import App from "./App.js";
class TacheService {
  _elTemplateTache;
  _elDetails;
  constructor() {
    // Variable en rapport avec l'affichage du détails
    this._elTemplate = document.querySelector("[data-template-details]");
    this._elDetails = document.querySelector("[data-js-tache-detail]");
    this.getTachesDetail = this.getTachesDetail.bind(this);
  }

  /**
   * Récupère en asynchrone les taches
   * @param {String} id
   */
  getTachesDetail(id) {
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
    fetch("requetes/requetesAsync.php", oOptions)
      .then(function (reponse) {
        if (reponse.ok) return reponse.json();
        else throw new Error("La réponse n'est pas OK");
      })
      .then(
        function (data) {

          if (data && data != "Erreur query string") {
            
            this.injecteDetail(data);
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

  /**
   * 
   * @param {tableau} datas 
   */
  injecteDetail(datas) {
    this._elDetails.innerHTML = '';
    if(datas.length == 0) this._elDetails.innerHTML = 'Aucune description disponible';
    let elCloneTemplate = this._elTemplate.cloneNode(true);

    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(
      "{{ id }}",
      datas[0].id
    );

    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(
      "{{ description }}",
      datas[0].description
    );
    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(
      "{{ importance }}",
      datas[0].importance
    );
    let elAffichageDetail = document.importNode(elCloneTemplate.content, true);

    this._elDetails.append(elAffichageDetail); // Ajouter un noeud
    this._elDetails.scrollIntoView({ behavior: "smooth"});
  }
}
export const { getTachesDetail } = new TacheService();
