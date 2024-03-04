import App from './App.js';
// export default class Tache extends App {
export default class Tache {
    constructor() {

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

        this._elTacheDetail.innerHTML = elDetailDom;
    }


    /**
     * Supprime la tâche du tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     */
    supprimeTache() {
        console.log('GO');
        let id = location.hash;
        console.log(id);
        this.objTache = {
            id: id,
            action: 'supprimeTache'
        }
        this.oOptions.body = JSON.stringify(this.objTache);
        this.appelFetch();

    }

    appelFetch() {
        fetch('requetes/supprimeTache.php', this.oOptions)
        .then(
          function (reponse) {
            if (reponse.ok) return reponse.text();
            else throw new Error("pas ok");
          }.bind(this)
        )
        .then(
          function (data) {
            if (data != "Erreur query string") {
                let datas = JSON.parse(this.oOptions.body);
                datas.index = data;
              this._el.reset();
              this.injecteTache(datas);
            }
          }.bind(this)
        )
        .catch(function (erreur) {
          console.log(erreur.message);
        });
      }
}

export const { afficheDetail, supprimeTache } =
  new Tache();