import { accueil } from "./Accueil.js";
import { getTachesDetail } from "./TacheService.js";

export default class Router {
  constructor() {

    this._routes = [
      ["", accueil],
      ["/afficher/:id", getTachesDetail],
    ];

    this.init();
  }

  init() {
    this.options = document.querySelectorAll("[data-js-taches]");

    this.options.forEach(
      function (e) {
        e.addEventListener(
          "click",
          function (onClick) {
            let action = onClick.target.dataset.jsAction,
            id = onClick.currentTarget.dataset.jsTaches;
            let hash = `#!/${action}/${id}`;
            window.location = hash;

          }.bind(this)
        );
      }.bind(this)
    );

    window.addEventListener(
      "hashchange",
      function () {
        this.gereHashbang()
      }.bind(this)
    );
  }

  // gestion du fragment d'url suite au #! pour faire appeler le comportement de la route correspondent
  gereHashbang() {

    let hash = location.hash.slice(2);

    let isRoute = false;

    if (hash.endsWith("/")) hash = hash.slice(0, -1);

    for (let i = 0; i < this._routes.length; i++) {
      let route = this._routes[i][0];
      let hashSansId;
      let isId = false;

      if (route.indexOf(":") > -1) {
        route = route.slice(0, route.indexOf("/:"));
        hashSansId = hash.slice(0, hash.lastIndexOf("/"));
        isId = true;
      }

      if (route == hash || route == hashSansId) {
        let hashInArray = hash.split(route);

        if (hashInArray[1]) {
          if (isId) {
            let id = hashInArray[1].slice(1);
            this._routes[i][1](id);
            isRoute = true;
            return id;
          }
        } else {
          if (hash == this._routes[i][0]) {
            this._routes[i][1]();
            isRoute = true;
          }
        }
      }
    }
  }
}

