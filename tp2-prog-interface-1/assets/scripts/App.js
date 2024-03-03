import Tache from './Tache.js';
export default class App {

    constructor() {
        this._elTemplate = document.querySelector('.template_tache__liste');
        this._elListe = document.querySelector('.to-do-list');
    }
    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {Int} index 
     */
    
    injecteTache(datas) {

        
        let elCloneTemplate = this._elTemplate.cloneNode(true);

		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ index }}', datas.index  );
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ tache }}', datas.tache);
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ importance }}', datas.importance);
		let elNouvelleTache = document.importNode(elCloneTemplate.content, true)
		console.log(elNouvelleTache);
		this._elListe.append(elNouvelleTache);  // Ajouter un noeud


        // Lance les comportements de la nouvelle tâche injectée
        new Tache(this._elTaches.lastElementChild);
}
}