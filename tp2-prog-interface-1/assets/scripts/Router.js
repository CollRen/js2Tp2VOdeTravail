
import { afficheDetail } from "./Tache.js";

export default class Router {
  constructor() {
    this.options = document.querySelectorAll("[data-js-action]");

    this._routes = [
      ["", accueil],
      ["/tache/:id", afficheDetail],
    ];

    this.init();
  }

  init() {
    this.options.forEach(
      function (e) {
        e.addEventListener(
          "click",
          function (onClick) {
            let hash = `#!/${onClick.currentTarget.dataset.jsHashbang}`;
            window.location = hash;

            if (hash == "#!/taches") this.elEcouteurTache();
          }.bind(this)
        );
      }.bind(this)
    );

    window.addEventListener(
      "hashchange",
      function () {
        this.gereHashbang();
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
            this._routes[i][1](id); //onde 1 é o método chamado (láááá em cima em this._routes, depois da vírgula)
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
