import App from './App.js';
// export default class Tache extends App {
export default class Tache {
    constructor(el) {
        this._el = el;
        this._index = this._el.dataset.jsTache;
        this._elActions = this._el.querySelector('[data-js-actions]');
        
        this._elTaches = this._el.closest('[data-js-taches]');
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'afficher') this.afficheDetail();
            else if (e.target.dataset.jsAction == 'supprimer') this.supprimeTache();
        }.bind(this));
    }


    /**
     * Affiche le détail d'une tâche
     */
    afficheDetail() {
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
        aTaches.splice(this._index, 1);

        // Réinjecte le tableau de tâches purgé de la tâche supprimée
        this._elTaches.innerHTML = '';
        for (let i = 0, l = aTaches.length; i < l; i++) {
            this.injecteTache(i);
        }
    }
}