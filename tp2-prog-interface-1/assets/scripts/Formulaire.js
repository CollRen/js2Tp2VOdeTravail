import App from './App.js';


export default class Formulaire extends App {
    constructor(el) {
        super();
        console.log(el);
        this._el = el;
        this._elInputTache = this._el.tache;
        this._elInputDescription = this._el.description;
        this._elsInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        
        this._elTaches = document.querySelector('[data-js-taches]');
        this.objTache = {};
        this.oOptions = {
            method: "POST",
            headers: { "Content-type": "application/json" },
          };
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            let estValide = this.valideFormulaire();
            if (estValide) {
                this.ajouteTache();
            }
        }.bind(this));
    }


    /**
     * Validation du formulaire
     * @returns
     */
    valideFormulaire() {

        let estValide = true;

        /* Input 'Nouvelle tâche' */
        if (this._elInputTache.value == '') {
            this._elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            if (this._elInputTache.parentNode.classList.contains('error')) this._elInputTache.parentNode.classList.remove('error');
        }

        /* Inputs Radio 'Importance' */
        let elCheckedImportance = this._el.querySelector('input[name="importance"]:checked');

        if (elCheckedImportance) {
            if (this._elsInputImportance[0].parentNode.classList.contains('error')) this._elsInputImportance[0].parentNode.classList.remove('error');
        } else {
            this._elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        }

        return estValide;
    }


    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    ajouteTache() {
        this.objTache = {
            tache: this._elInputTache.value,
            description: this._elInputDescription.value,
            importance: this._el.querySelector('input[name="importance"]:checked').value,
            action: 'ajouteTache'
        }
        this.oOptions.body = JSON.stringify(this.objTache);
        this.appelFetch();

    }

    appelFetch() {
        fetch('requetes/ajouteTache.php', this.oOptions)
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