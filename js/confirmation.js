function displayOrder() {
    try {
      const htmlTag = document.querySelector("#orderId");
      const currentUrl = new URL(window.location.href); // On récupère ton url
      //console.log(currentUrl)
  
      if (currentUrl.searchParams.has("orderId")) {
        // on vérifie que ton url contienne un parametre "orderId"
  
        const id = currentUrl.searchParams.get("orderId"); // On récupère le contenu du paramètre
        //console.log(id);
        htmlTag.innerHTML += `${id}`; // tu affiche ton id
      }
    } catch (error) {
      console.error(error);
    }
  }
  displayOrder()
  