let thumbnails = document.querySelectorAll(".thumbnails button");
let avatar = document.querySelector("#avatar");
let amountButtons = document.querySelectorAll(".amount button");
let cart = document.querySelector(".cart");
let cartIcon = document.getElementById("cart-grey");
var cartOpen = false;

function thumbFocus() {
  this.querySelector("img").style.opacity = "0.25";
  this.style.borderStyle = "solid";
}

function thumbFocusOut() {
  this.querySelector("img").style.opacity = "1";
  this.style.borderStyle = "none";
}

function thumbMouseOver() {
  const image = this.querySelector("img");
  const styles = window.getComputedStyle(image);
  const opacity = styles.opacity;
  if(opacity==1){
    this.querySelector("img").style.opacity = "0.5";
  }
}

function thumbMouseOut() {
  const image = this.querySelector("img");
  const styles = window.getComputedStyle(image);
  const opacity = styles.opacity;
  if(opacity==0.5){
    this.querySelector("img").style.opacity = "1";
  }
}


function avatarHover() {
  this.style.borderStyle = "solid";
  this.querySelector("img").style.top="0px";
  this.querySelector("img").style.left="0px";
}

function avatarUnhover () {
  this.style.borderStyle = "none";
  this.querySelector("img").style.top="2px";
  this.querySelector("img").style.left="2px";
}

function buttonHover () {
  this.querySelector("use").style.fill = "#FFAB6A";
}

function buttonUnhover() {
  this.querySelector("use").style.fill = "#FF7E1B";
}

function cartToggle() {
  if(cartOpen){
    cart.style.display = "none";
    cartOpen = false;
  } else {
    cart.style.display = "inline";
    cartOpen = true;
  }
}


for (let i=0; i<thumbnails.length; i++) {
  thumbnails[i].addEventListener("mouseover", thumbMouseOver);
  thumbnails[i].addEventListener("mouseout" , thumbMouseOut);
  thumbnails[i].addEventListener("focus", thumbFocus);
  thumbnails[i].addEventListener("focusout", thumbFocusOut);
}

avatar.addEventListener("mouseover", avatarHover);
avatar.addEventListener("mouseout", avatarUnhover)

amountButtons[0].addEventListener("mouseover", buttonHover);
amountButtons[1].addEventListener("mouseover", buttonHover);

amountButtons[0].addEventListener("mouseout", buttonUnhover);
amountButtons[1].addEventListener("mouseout", buttonUnhover);

cartIcon.addEventListener("click", cartToggle);
