import { classesMapping } from "./classMapping.js";
import Formulaire from "./Formulaire.js";
import Detail from "./Detail.js";
import TrierTaches from "./TrierTaches.js";

window.addEventListener("DOMContentLoaded", function () {
  let elsFormulaire = document.querySelectorAll("[data-js-formulaire]"),
    elsTrierTaches = document.querySelectorAll("[data-js-trier-taches]"),
    elComponents = document.querySelectorAll("[data-js-component]"),
    elsDetail = document.querySelectorAll("[data-js-detail]");

  /**
   * Initialisation du Router
   */
  for (let i = 0, l = elComponents.length; i < l; i++) {
    let datasetComponent = elComponents[i].dataset.jsComponent,
      elComponent = elComponents[i];

    for (let key in classesMapping) {
      if (datasetComponent == key)
        new classesMapping[datasetComponent](elComponent);
    }
  }

  for (let i = 0, l = elsFormulaire.length; i < l; i++) {
    new Formulaire(elsFormulaire[i]);
  }

  for (let i = 0, l = elsTrierTaches.length; i < l; i++) {
    new TrierTaches(elsTrierTaches[i]);
  }

  for (let i = 0, l = elsDetail.length; i < l; i++) {
    new Detail(elsDetail[i]);
  }
});
