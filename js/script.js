let products =[];
// créer un tableau products
let itemsHtml = document.querySelector(".items")
// stocker la classe item
const fetchproducts = ()=>{
  //créer une fonction qui va communiquer avec l'API
   fetch("https://api-kanap.herokuapp.com/api/products").then((res) => {
       return res.json()
       //stocker la promesse dans un fichier JSON
   }).then((data)=>{
        products = data
        //stocker cette promesse dans la variable data
        displayProducts()
        //executer la fonction displayProducts
   })
};
fetchproducts();
//appeller la fonction fetch
const displayProducts = () => { 
  //créer une fonction qui va afficher les produits
    products.forEach((product) => {
      // pour chaque entrée dans le tableau aller chercher dans le DOM product
        itemsHtml.innerHTML += `<a href="html/product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`  // injecter le html en utilisant les backtypes ' et le $ pour que ce soit dynamique
    })     
}


