export async function appelFetch(ressource, options) {
    try {
      let reponse = await fetch(ressource, options);
      if (reponse.ok) {
        // ref : https://stackoverflow.com/questions/37121301/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript
        const contentType = reponse.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1)
          return reponse.json();
        else return reponse.text();
      } else throw new Error("La réponse n'est pas OK");
    } catch (erreur) {
      return erreur.message;
    }
  }