// récupérer le paramètre de l'url et le stocker dans "id"
const id = new URLSearchParams(window.location.search).get('id')
//  stocker les éléments HTML de la page Product
const itemImg = document.querySelector(".item__img")
const itemTitle = document.querySelector("#title")
const itemPrice = document.querySelector("#price")
const itemDescri = document.querySelector("#description")
const itemColor = document.querySelector("#colors")
const buttonAdd = document.querySelector("#addToCart")
// créer une variable product
let product
// récupérer dans l'API le produit par son id et le stocker dans product
function fetchProduct(){
    fetch(`https://api-kanap.herokuapp.com/api/products/${id}`).then((res) => {
        return res.json()
    }).then((data)=>{
         product = data
         console.log(product)
         displayProduct()
    })
}
// affiche dans le page HTML le produit dynamiquement
function displayProduct(){
    // ``= mélanger des chaines de caractères et des variables
    itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    itemTitle.innerHTML = product.name
    itemPrice.innerHTML = product.price
    itemDescri.innerHTML = product.description
    product.colors.forEach((color) => {
        itemColor.innerHTML += `<option value="${color}">${color}</option> `
    });
}
// appeler la fonction qui va récupérer les données
fetchProduct()
// écouter le click sur le boutton
buttonAdd.addEventListener("click",()=>{
    addProductCart()      
})
function addProductCart(){
    //créer un objet qui sera ajouter dans le panier
    let productCart = {
        id : product._id,
        // parseInt va transformer la chaine de caractère en nombre parce que les éléments HTML sont sous forme de chaines de caractères
        quantity: parseInt(document.querySelector("#quantity").value),
        color : itemColor.value
    }
    // créer un panier qui est tableau vide par défaut
    let cart = []
    let indexProduct
    // Le panier va se  modifier que si le panier du localstorage n'est pas vide
    if (getCart() !== null){
        cart = getCart()
        indexProduct = cart.findIndex(p=>p.id == productCart.id && productCart.color == p.color)
        if (indexProduct > -1){
            cart[indexProduct].quantity+=productCart.quantity
        }else{
            cart.push(productCart)
        }
    }else {
        cart.push(productCart)
    }
    // sauvegarder le tableau auquel on a rajouté un produit dans le localstorage 
    saveCart(cart)
    alert("Produit ajouté") 
}
  

//sauvegarder ou mettre à jour la panier
function saveCart(cart){  
    // cart est la clé  et JSON.stringify permet de modifier le format de donnée pour qu'elle soit compréhensible par le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));   
}
// chercher dans le local storage cart
function getCart(){ 
    return JSON.parse(localStorage.getItem("cart"));
}
