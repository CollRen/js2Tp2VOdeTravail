import App from './App.js';
import { appelFetch } from "./App3.js";
// export default class Tache extends App {
export default class Tache {
  #_el;
  #_elBtnAction;
  #_action;
  #_elId;
    constructor(_el) {

      this.#_el = _el;
      this.#_elBtnAction = this.#_el.querySelector('[data-js-actions]');
      this.#_action = "";
      this.#_elId = this.#_el.dataset.jsTaches;
      this._oOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
      };
      this.objTache = {
        id: this.#_elId,
    }
      this.init();
    }

    init() {
      this.#action();

    }

    #action() {
      this.#_elBtnAction.addEventListener(
        "click",
        function (e) {
          this.#_action = this.objTache.action = e.target.dataset.jsAction;
          e.preventDefault();
          //if (this.#_elChampNom.value) this.equipe.nom = this.#_elChampNom.value;
          //this.appelFetch();
          /* if (this.#_action == "changer") this.#changeNom(); */
          if (this.#_action == "supprimer") this.#supprimer();
        }.bind(this)
      );
    }


    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail() {
        console.log('afficheDetail');
        let description = aTaches[this._index].description;

        let elDetailDom =  `<div export default class="detail__info">
                                <p><small>Tâche : </small>${aTaches[this._index].tache}</p>
                                <p><small>Description : </small>${description ? description : 'Aucune description disponible.'}</p>
                                <p><small>Importance : </small>${aTaches[this._index].importance}</p>
                            </div>`;

        //this.#_elTacheDetail.innerHTML = elDetailDom;
    }




    #supprimer() {
      this._oOptions.body = JSON.stringify(this.objTache);
  
      appelFetch("requetes/requetesAsync.php", this._oOptions)
        .then(
          function (data) {
            //console.log(data)
            if (data != "Erreur query string") {
              this.#_el.remove();
            }
          }.bind(this)
        )
        .catch(function (erreur) {
          console.log(erreur.message);
        });
    }

}

/* export const { afficheDetail, supprimeTache } =
  new Tache(); */