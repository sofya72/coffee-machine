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

//-----------------------Купюры-------------------------------------

let bills = document.querySelectorAll('.bills img');

for (let i = 0; i < bills.length; i++) {
   bills[i].onmousedown = takeMoney;
   /* bills[i].onmousedown = function (event) {
    takeMoney(event);
  }*/
}

function takeMoney(event) {
  event.preventDefault();
 // alert("Вы нажали на купюру");
  let bill = event.target;
  
  bill.style.position = "absolute";
  bill.style.transform = "rotate(90deg)";
  bill.style.margin = 0;
  
  let billCoords = bill.getBoundingClientRect();
  let billWidth = billCoords.width;
  let billHeight = billCoords.height;
  
  bill.style.top = event.clientY - billWidth/2 + "px";
  bill.style.left = event.clientX - billHeight/2 + "px";
  
  window.onmousemove = function (event) {
    bill.style.top = event.clientY - billWidth/2 + "px";
    bill.style.left = event.clientX - billHeight/2 + "px";
  }
  
  bill.onmouseup = function () {
    window.onmousemove = null;
    console.log( inAtm(bill) );
  }
  
}

function inAtm(bill) {
  let atm = document.querySelector('.atm img');
  
  let atmCoords = atm.getBoundingClientRect();
  let billCoords = bill.getBoundingClientRect();
  
  let billLeftTopCorner = {"x" : billCoords.x, "y" : billCoords.y};
  let billRightTopCorner = {"x" : billCoords.x + billCoords.width, "y" : billCoords.y};
  
  let atmLeftTopCorner = {"x" : atmCoords.x, "y" : atmCoords.y}; 
  let atmRightTopCorner = {"x" : atmCoords.x + atmCoords.width, "y" : atmCoords.y}; 
 let atmLeftBottomCorner = {"x" : atmCoords.x, "y" : atmCoords.y + atmCoords.height/3};
  
  // return [atmLeftTopCorner, atmRightTopCorner, atmLeftBottomCorner];
  if (billLeftTopCorner.x > atmLeftTopCorner.x
    && billRightTopCorner.x < atmRightTopCorner.x
    && billLeftTopCorner.y > atmLeftTopCorner.y
    && billLeftTopCorner.y < atmLeftBottomCorner.y
    ) {
      return true;
      } else {
      return false;  
    }
  
}
