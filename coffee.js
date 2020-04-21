"use strict";
let state = "waiting";

let cupImg = document.querySelector(".coffee-cup img");
let progressBar = document.querySelector(".progress-bar");

cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  if (state  != "waiting") {
    return;
  }
//  console.log([name, price, element]);
  let balanceInput = document.querySelector("input[placeholder='Баланс']");
 // balanceInput.value = 100; // задаем баланс
//  console.log(balanceInput);

  if ( +balanceInput.value < price ) {
  //  alert("Недостаточно средств");
  changeDisplayText("Недостаточно средств");
  balanceInput.style.border = "2px solid red";
  } else {
    balanceInput.value -= price; // вычитаем price из balance
    balanceInput.style.border = "";
    state = "cooking";
    cookCoffee(name, element);
  }
}

function cookCoffee(name, buttonElement) {
  changeDisplayText("Ваш " + name + " готовится");
  
  let buttonImg = buttonElement.querySelector("img");
  let cupSrc = buttonImg.getAttribute('src');
  let cupImg = document.querySelector(".coffee-cup img");
  // console.log(cupSrc);
  cupImg.setAttribute('src', cupSrc);
  cupImg.classList.remove('d-none');
  
  let i = 0;
  let interval = setInterval(function () {
    i++;
    progressBar.style.width = i + "%";
    cupImg.style.opacity = i + "%";
    // console.log(i);
    if (i == 110) {
      clearInterval(interval);
      changeDisplayText("Ваш " + name + " готов!");
      cupImg.style.cursor = "pointer";
      state = "ready";
    }
  },100)
}

function takeCoffee() {
  if (state !="ready") {
    return;
  }
  state = "waiting";
  cupImg.style.opacity = 0;
  cupImg.style.cursor = "";
  cupImg.classList.add("d-none");
  changeDisplayText("Выберите кофе");
  progressBar.style.width = 0;
}

function changeDisplayText(text) {
  let displayText = document.querySelector('.display-text');
  displayText.innerHTML = text;
}