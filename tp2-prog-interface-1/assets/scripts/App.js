import Tache from './Tache.js';
import Router from './Router.js';
export default class App {

    constructor() {
        this._elListe = document.querySelector('.to-do-list__taches');
    }
    /**
     * Construit, injecte et lance les comportements de chaque nouvelle tâche
     * @param {Int} i 
    */
   
   injecteTaches(datas) {
        this._elTemplate = document.querySelector('.template_tache__liste');

        let i = 0
        if(datas[0]){

        } else {
            let data = [];
            data[0] = datas;
            datas = data;
        }

        for (i = 0; i < datas.length; i++) {
            
        
        let elCloneTemplate = this._elTemplate.cloneNode(true);
        
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ index }}', datas[i].id);
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ tache }}', datas[i].tache);
		elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace('{{ importance }}', datas[i].importance);
		let elNouvelleTache = document.importNode(elCloneTemplate.content, true)
		this._elListe.append(elNouvelleTache);  // Ajouter un noeud


        // Lance les comportements de la nouvelle tâche injectée
        new Tache(this._elListe.lastElementChild);
}
    new Router;
}
}