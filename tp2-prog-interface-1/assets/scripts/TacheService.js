class TacheService {
  #_elTemplateTache;
  #_elDetails;
  constructor() {
    this.#_elTemplateTache = document.querySelector(".template_tache__detail");
    console.log(this.#_elTemplateTache);
    this.#_elDetails = document.querySelector("[data-js-tache-detail]");
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
        "Content-Type": " application/json",
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
          //console.log(data);

          if (data && data != 'Erreur query string') {
              //this.#afficheListeTaches(data);
          } else {
              //console.log('Erreur query string');
          }

          if (data.length > 0) {
            //this.#_elDetails.innerHTML = "";
            //let elUl = document.createElement("ul");

            console.log(data); debugger;
            for (let i = 0; i < data.length; i++) {
              //console.log(data[i]);
              let elCloneTemplate = this.#_elTemplateTache.cloneNode(true);

              for (let cle in data[i]) {
                let regExp = new RegExp("{{" + cle + "}}", "g");
                elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(
                  regExp,
                  data[i][cle]
                );
              }

              let elContent = document.importNode(
                elCloneTemplate.content,
                true
              );
              elUl.append(elContent);
            }
            this.#_elDetails.append(elUl);
          } else {
            this.#_elDetails.innerHTML =
              "<p> pas de taches dans cette équipe </p>";
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
export const { getTachesDetail } = new TacheService();
