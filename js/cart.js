// récupérer le tableau où on mettre les infos du panier (seulement id, couleur et quantité)
let cart = JSON.parse(localStorage.getItem("cart"))
// créer un tableau pour mettre les infos du panier et de l'API
let products = []
const cartItems = document.querySelector('#cart__items')
// boucler sur le tableau, product est un objet qui est un élément du panier qui était dans le localstorage
cart.forEach((productCart)=>{
    // on appelle l'API pour récupérer les infos du produit en fonction de son id qu'on a stocké dans cart
    fetch(`https://api-kanap.herokuapp.com/api/products/${productCart.id}`).then((res) => {
        return res.json()
        // data est le paramètre, il contient le résultat de la requête
    }).then((data)=>{
            // on ajoute dans l'array products un objet qui contient les infos du panier et les infos de l'API dont ona besoin
         products.push({
             id:productCart.id,
             imageUrl:data.imageUrl,
             name:data.name,
             price:data.price,
             description:data.description,
             altTxt:data.altTxt,
             quantity:productCart.quantity,
             color:productCart.color
         })
         //fonction pour afficher les infos contenus dans panier
         displayCart()
    })
})
// fonction pour afficher les produits
function displayCart(){
    // créer une variable de chaine de caractères vide
    let html = ""
    //boucler sur le tableau products qui contient tous les objets avec toutes les données qu'on vient de créer
    // il faut toujours boucler sur un tableau et c'ets pour ça qu'on peut sélectionner ${product.id}
    products.forEach((product)=>{
        // ajouter à chaque fois un article complet en html sans remplacer
        // on met les valeurs avec les backtypes et les $
        //onchange équivalkent de addEventListener lu par le html
        // '' pour que le html n interprête pas ça comme une variable
        html += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" onchange="changeQuantity(event, '${product.id}', '${product.color}')"  class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" onclick="deleteProduct('${product.id}','${product.color}')">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      
    })
    //la section cartItems se modifie avec la chaine de caractère de html
    cartItems.innerHTML = html
    displayTotalPrice()
    displayTotalQuantity()
}
displayCart()

// on appelle la fonction changeQuantity l.53 et on met les paramètres de la fonction changeQuantity(event, '${product.id}', '${product.color}') = changeQuantity(event, id, color)
function changeQuantity(event, id, color){
  //console.log(id)
  // Il faut faire une boucle pour aprcourir le tableau
  // on défini une variable, tant que la variable est inférieure à la longueur du tableau products, on ajouter +1 à i
  // i c'est uen variable pour donner un index quand on fait products[i]
  for(let i = 0;i<products.length;i++){
    // on parcourt chaque objet du tableau avec i et on check la valeur id et color, si elles sont égales au paramètres de la fonction qu'on a intégré l.53
    if (products[i].id === id && products[i].color === color){
      //event.target.value ça correspond à l'input quand on a bougé. On peut parcour les event avec console.log(event)
      // parseInt sert à transofrmer les strings en number. Parce que event.target.value est une string
      products[i].quantity = parseInt(event.target.value)
    }
  }
  for(let i = 0;i<cart.length;i++){
    // on parcourt chaque objet du tableau avec i et on check la valeur id et color, si elles sont égales au paramètres de la fonction qu'on a intégré l.53
    if (cart[i].id === id && cart[i].color === color){
      //event.target.value ça correspond à l'input quand on a bougé. On peut parcour les event avec console.log(event)
      // parseInt sert à transofrmer les strings en number. Parce que event.target.value est une string
      cart[i].quantity = parseInt(event.target.value)
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayTotalPrice()
  displayTotalQuantity()
} 

function deleteProduct(id, color){
  
  for(let i = 0; i<products.length; i++){
    if (products[i].id === id && products[i].color === color){
      //console.log(products.indexOf('products[i].id'))
      products.splice(i,1)
      //console.log(products)
    }
  }
  //console.log(cart)
    for(let i = 0; i<cart.length; i++){
      if (cart[i].id === id && cart[i].color === color){
        cart.splice(i, 1)
        //console.log(event)
        //console.log(cart)
        displayCart()
      }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// calcul prix total


function displayTotalPrice() {
  let totalPrice = 0
  for (let p = 0; p < products.length; p++) {
    const productPriceInCart = products[p].price * products[p].quantity
    console.log(Number(products[p].quantity))
    totalPrice += productPriceInCart
  }
  const totalPriceTag = document.getElementById("totalPrice")
  totalPriceTag.innerHTML = totalPrice
}

// Calcul quantité totale de produits

function displayTotalQuantity() {
  let totalQuantity = 0
  for (let p = 0; p < products.length; p++) {
    const productQuantityInCart = Number(products[p].quantity)
    totalQuantity += productQuantityInCart
  }
  const totalQtyTag = document.getElementById("totalQuantity")
  totalQtyTag.innerHTML = totalQuantity
}

// stocker les éléments du formulaire
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')

// créer un objet qui va se remplir avec des strings
let orderContact = {
  firstName : "",
  lastName : "",
  email : "",
  address : "",
  city : "",
}

// regex prénom
firstName.addEventListener('change', function(){
  validFirstName(firstName.value)
  console.log(firstName.value)
})
const validFirstName = function (inputText){
  // Création regexp pour la validation de fistName
  let firstNameRegExp = new RegExp(/^([a-zA-Z,.'-]+[ ]?)+$/)
  let testFirstName = firstNameRegExp.test(firstName.value)
  console.log(firstName.value)
  //let firstNameErrorMsg = ""

  if(inputText.length>2 && testFirstName){
    firstNameErrorMsg.innerHTML = ""
    orderContact.firstName = inputText
    //firstNameErrorMsg.classList.remove('text-danger')
    //firstNameErrorMsg.classList.add('text-success')
  } else{
    firstNameErrorMsg.innerHTML = "Prénom Invalide"
    //firstNameErrorMsg.classList.remove('text-success')
    //firstNameErrorMsg.classList.add('text-danger')
  }
};
// régex Nom
lastName.addEventListener('change', function(){
  validlastName(lastName.value)
  console.log(lastName.value)
})
const validlastName = function (inputText){
  // Création regexp pour la validation email
  let lastNameRegExp = new RegExp(/^([a-zA-Z,.'-]+[ ]?)+$/)
  let testLastName = lastNameRegExp.test(lastName.value)
  console.log(lastName.value)

  if(inputText.length>2 && testLastName){
    lastNameErrorMsg.innerHTML = ""
    orderContact.lastName = inputText
  } else{
    lastNameErrorMsg.innerHTML = "Nom Invalide"
  }
};

// Regex adresse postale
address.addEventListener('change', function(){
  validaddress(address.value)
  console.log(address.value)
})
const validaddress = function (inputText){
  let addressRegExp = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/)
  let testaddress = addressRegExp.test(address.value)
  console.log(address.value)

  if(testaddress){
    addressErrorMsg.innerHTML = ""
    orderContact.address = inputText

  } else{
    addressErrorMsg.innerHTML = "Adresse postale invalide"
  }
};

// Regex Ville
city.addEventListener('change', function(){
  validcity(city.value)
  console.log(city.value)
})
const validcity = function (inputText){
  // Création regexp pour la validation email
  let cityRegExp = new RegExp(/^([a-zA-Z,.'-]+[ ]?)+$/)
  let testCity = cityRegExp.test(city.value)
  console.log(city.value)

  if(inputText.length>2 && testCity){
    cityErrorMsg.innerHTML = ""
    orderContact.city = inputText
  } else{
    cityErrorMsg.innerHTML = "Ville Invalide"
  }
};

// régex email
email.addEventListener('change', function(){
  validemail(email.value)
  console.log(email.value)
})
const validemail = function (inputText){
  // Création regexp pour la validation de fistName
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  let testemail = emailRegExp.test(email.value)
  console.log(email.value)
  //let emailErrorMsg = ""

  if(testemail){
    emailErrorMsg.innerHTML = ""
    orderContact.email = inputText

  } else{
    emailErrorMsg.innerHTML = "Adresse mail invalide"
  }
};

// contact
let order = document.querySelector('.cart__order__form')
//let orderId = document.getElementById('orderId')
order.addEventListener("submit", function(event){
  event.preventDefault()
  submit ()
})

function submit (){
  let productList = cart.map((item)=>{
    return item.id
  })
  fetch("https://api-kanap.herokuapp.com/api/products/order",{
    method : "post", 
    headers: { accept: "application/json", "content-type": "application/json" },
    body : JSON.stringify({
      contact : orderContact,
      products : productList
    })
  }).then(res=>res.json())
  .then((data)=>{
    console.log(data)
    window.location.href =`./confirmation.html?orderId=${data.orderId}`
  })
  console.log(productList)
  console.log(orderContact)
  //orderContact.push(submitContact)
}





