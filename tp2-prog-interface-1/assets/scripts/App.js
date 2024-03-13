import Tache from './Tache.js';
import Router from './Router.js';
export default class App {

    constructor() {
        this._elListe = document.querySelector('.to-do-list__taches');
    }
    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {Int} index 
    */
   
   injecteTache(datas) {
        this._elTemplate = document.querySelector('.template_tache__liste');

        for (let index = 0; index < datas.length; index++) {
            
        
        let elCloneTemplate = this._elTemplate.cloneNode(true);
        
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ index }}', datas[index].id  );
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ tache }}', datas[index].tache);
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ importance }}', datas[index].importance);
		let elNouvelleTache = document.importNode(elCloneTemplate.content, true)
		// console.log(elNouvelleTache);
		this._elListe.append(elNouvelleTache);  // Ajouter un noeud


        // Lance les comportements de la nouvelle tâche injectée
        new Tache(this._elListe.lastElementChild);
}
    new Router;
}

}