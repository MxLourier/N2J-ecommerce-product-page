let thumbnails = document.querySelectorAll(".thumbnails button");
let avatar = document.querySelector("#avatar");
let amountButtons = document.querySelectorAll(".amount button");
let cart = document.querySelector(".cart");
let cartIcon = document.getElementById("cart-grey");
var cartOpen = false;
var images = document.querySelectorAll(".container-left>img");
let cartFull = document.querySelector(".cart-full");
const addButton = document.getElementById("add-button");
var k = 0; //Index of current image, will be used for arrow functionality



addButton.disabled = true;
//default amount is 0, that's why the add button is disabled  by default

function thumbFocus() {
  for(i=0; i<thumbnails.length; i++){
    thumbnails[i].style.borderStyle = "none";
    thumbnails[i].querySelector("img").style.opacity = "1";
  }
  this.querySelector("img").style.opacity = "0.25";
  this.style.borderStyle = "solid";
}

//Not using eventlistener for thumbnail focusout allows us to keep a thumbnail image highlighted even when we click away
//This way there is a highlighted thumbnail image at any given moment, even if no thumbnail is in fact in focus

function thumbFocusLightbox() {
  for(i=0; i<thumbnails.length; i++){
    thumbnailsLightbox[i].style.borderStyle = "none";
    thumbnailsLightbox[i].querySelector("img").style.opacity = "1";
  }
  this.querySelector("img").style.opacity = "0.25";
  this.style.borderStyle = "solid";
}



function thumbMouseOver() {
  const image = this.querySelector("img");
  const styles = window.getComputedStyle(image);
  const opacity = styles.opacity;
  if (opacity == 1) {
    this.querySelector("img").style.opacity = "0.5";
  }
}

function thumbMouseOut() {
  const image = this.querySelector("img");
  const styles = window.getComputedStyle(image);
  const opacity = styles.opacity;
  if (opacity == 0.5) {
    this.querySelector("img").style.opacity = "1";
  }
}


function avatarHover() {
  this.style.borderStyle = "solid";
  this.querySelector("img").style.top = "0px";
  this.querySelector("img").style.left = "0px";
}

function avatarUnhover() {
  this.style.borderStyle = "none";
  this.querySelector("img").style.top = "2px";
  this.querySelector("img").style.left = "2px";
}

function buttonHover() {
  this.querySelector("use").style.fill = "#FFAB6A";
}

function buttonUnhover() {
  this.querySelector("use").style.fill = "#FF7E1B";
}

function cartToggle() {
  if (cartOpen) {
    cart.style.display = "none";
    cartOpen = false;
    this.querySelector("path").setAttribute("fill", "#69707D");

  } else {
    cart.style.display = "inline";
    cartOpen = true;
    this.querySelector("path").setAttribute("fill", "#1D2026");
  }
}

function amountSubstract() {
  let amount = document.querySelector(".amount-number").innerHTML;
  if (amount > 0) {
    amount--;
    document.querySelector(".amount-number").innerHTML = amount;
    if (amount == 0) {
      addButton.disabled = true;
    }
  }
}

function amountAdd() {
  let amount = document.querySelector(".amount-number").innerHTML;
  amount++;
  document.querySelector(".amount-number").innerHTML = amount;
  if (amount == 1) {
    addButton.disabled = false;
  }
}

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("mouseover", thumbMouseOver);
  thumbnails[i].addEventListener("mouseout", thumbMouseOut);
  thumbnails[i].addEventListener("focus", thumbFocus);
  thumbnails[i].addEventListener("focus", () => { //Show big image that corresponds to thumbnail in focus
    for (let j = 0; j < thumbnails.length; j++) {
      images[j].style.display = "none";
    }
    images[i].style.display = "inline";
  })
  // thumbnails[i].addEventListener("focusout", thumbFocusOut);
}

avatar.addEventListener("mouseover", avatarHover);
avatar.addEventListener("mouseout", avatarUnhover)

amountButtons[0].addEventListener("mouseover", buttonHover);
amountButtons[1].addEventListener("mouseover", buttonHover);

amountButtons[0].addEventListener("mouseout", buttonUnhover);
amountButtons[1].addEventListener("mouseout", buttonUnhover);

amountButtons[0].addEventListener("click", amountSubstract);
amountButtons[1].addEventListener("click", amountAdd);


cartIcon.addEventListener("click", cartToggle);

///////////////////  Add to cart functionality

addButton.addEventListener("click", addToCart);

var cartItems = [];


// Get input for chosen article and amount, store into an array of all cart items
function addToCart() {
  let cartInfo = {};
  let sPrice = document.querySelector(".container-right h3").innerHTML;
  sPrice = sPrice.slice(1);
  const name = document.querySelector(".container-right h2").innerHTML;
  cartInfo.amount = document.querySelector(".amount-number").innerHTML;
  cartInfo.amount = parseFloat(cartInfo.amount);
  cartInfo.imageUrl = document.querySelector(".thumbnails img").getAttribute("src");
  let tPrice = parseFloat(sPrice) * cartInfo.amount;
  tPrice = parseFloat(tPrice).toFixed(2);

  cartInfo.content = `<p>${name}<br>$${sPrice} x ${cartInfo.amount}<b> $${tPrice}</b></p>`;

  cart.style.display = "inline";
  cart.querySelector(".cart-full").style.display = "block";
  cart.querySelector(".cart-empty").style.display = "none";
  cartOpen = true;

  cartItems.push(cartInfo);


  renderCart();

}


// Configure cart content - render all chosen items
function renderCart() {
  if (cartItems.length === 0) { //Show "your cart is empty" message
    document.querySelector(".cart-full").style.display = "none";
    document.querySelector(".cart-empty").style.display = "block";
    document.getElementById("cart-number").style.display = "none";
  } else { //Show a list of all items in cart
    document.querySelector(".cart-content").innerHTML = "";
    var totalAmount = 0;
    for (let i = 0; i < cartItems.length; i++) {

      totalAmount += cartItems[i].amount;
      var productImage = document.createElement("img");
      var productDescription = document.createElement("p");
      var productDelete = document.createElement("img");

      productImage.setAttribute("src", cartItems[i].imageUrl);
      productImage.className = " product-image";

      productDescription.innerHTML = cartItems[i].content;

      productDelete.setAttribute("src", "images/icon-delete.svg");
      productDelete.className = " icon-delete";

      var productContainer = document.createElement("div");
      productContainer.className = "product-container";
      productContainer.appendChild(productImage);
      productContainer.appendChild(productDescription);
      productContainer.appendChild(productDelete);

      document.querySelector(".cart-content").appendChild(productContainer);

      productDelete.addEventListener("click", deleteItem);

      function deleteItem() {
        cartItems.splice(i, 1);
        renderCart();
      }

    }

    document.getElementById("cart-number").innerHTML = totalAmount;
    document.getElementById("cart-number").style.display = "inline";
  }
}

////////// Lightbox functionality

let closeButton = document.querySelector(".container-lightbox svg");
let thumbnailsLightbox = document.querySelectorAll(".thumbnails-lightbox button");
let imagesLightbox = document.querySelectorAll(".lightbox-content>img");

for (let i = 0; i < images.length; i++) { //Open lightbox whenever user clicks on big product image
  images[i].addEventListener("click", () => {
    document.querySelector(".lightbox").style.display = "inline"; // Open lightbox
    for (let j = 0; j < images.length; j++) {
      imagesLightbox[j].style.display = "none"; //Hide all big images
    }
    imagesLightbox[i].style.display = "inline"; //Show only the big lightbox image that corresponds to the original image the user clicked on
    thumbnailsLightbox[i].focus();
    k = i;
  })
}



closeButton.addEventListener("click", () => { //Close lightbox once the "x" icon is clicked
  document.querySelector(".lightbox").style.display = "none";
  thumbnails[0].focus();

})


//Configure mouseover, mouseout, focus - identical to thumbnails on the main page
for (let i = 0; i < thumbnailsLightbox.length; i++) {
  thumbnailsLightbox[i].addEventListener("mouseover", thumbMouseOver);
  thumbnailsLightbox[i].addEventListener("mouseout", thumbMouseOut);
  thumbnailsLightbox[i].addEventListener("focus", thumbFocusLightbox);
  thumbnailsLightbox[i].addEventListener("focus", () => { //Show big image that corresponds to thumbnail in focus
    for (let j = 0; j < thumbnailsLightbox.length; j++) {
      imagesLightbox[j].style.display = "none";
    }
    imagesLightbox[i].style.display = "inline";
    k = i;
  })
}

//// Lightbox arrows
let arrows = document.querySelectorAll(".lightbox-content>button");

arrows[0].addEventListener("mouseover", arrowHover);
arrows[0].addEventListener("mouseout", arrowUnhover);
arrows[1].addEventListener("mouseover", arrowHover);
arrows[1].addEventListener("mouseout", arrowUnhover);

arrows[0].addEventListener("click", arrowPrev);
arrows[1].addEventListener("click", arrowNext);


function arrowHover() {
  this.querySelector("path").setAttribute("stroke", "#FF7E1B");
}

function arrowUnhover() {
  this.querySelector("path").setAttribute("stroke", "#1D2026");
}

function arrowPrev() {
  if (k > 0) {
    k--;
  }
  thumbnailsLightbox[k].focus();

}

function arrowNext() {
  if (k < 3) {
    k++;
  }
  thumbnailsLightbox[k].focus();
}

///////// Mobile arrows functionality

let arrowsMobile = document.querySelectorAll(".arrows-mobile");
var q=0; //Default image

arrowsMobile[0].addEventListener("click", mobilePrev);
arrowsMobile[1].addEventListener("click", mobileNext);

function mobilePrev() {
  if(q>0){
    q--;
    for(let i=0; i<images.length; i++){
      images[i].style.display = "none";
    }
    images[q].style.display = "inline";
  }
}

function mobileNext() {
  if(q<(images.length - 1)){
    q++;
    for(let i=0; i<images.length; i++){
      images[i].style.display = "none";
    }
    images[q].style.display = "inline";
  }
}




//////////// Mobile menu functionality

let closeMenu = document.querySelector(".menu-mobile-content img");
let openMenu = document.getElementById("icon-menu");

openMenu.addEventListener("click", ()=>{
  document.querySelector(".menu-mobile").style.display = "block";
})

closeMenu.addEventListener("click", ()=>{
  document.querySelector(".menu-mobile").style.display = "none";
})
