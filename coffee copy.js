"use strict";
let state = "waiting";

let cupImg = document.querySelector(".coffee-cup img");
let progressBar = document.querySelector(".progress-bar");
let balanceInput = document.querySelector("input[placeholder='Баланс']");

cupImg.onclick = takeCoffee;

function buyCoffee(name, price, element) {
  if (state  != "waiting") {
    return;
  }
//  console.log([name, price, element]);
  
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
    if ( inAtm(bill) ) {
      let billCost = +bill.getAttribute('cost');
      balanceInput.value = +balanceInput.value + billCost;
      bill.remove();
    }
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

// Сдача

let changeButton = document.querySelector(".change-btn");

changeButton.onclick = function () {
  let changeBox = document.querySelector(".change-box");
  let coins = changeBox.querySelectorAll("img");
  if (coins.length == 0) {
    if(balanceInput.value == 0) {
      return;
    }
    changeButton.innerHTML = "Забрать сдачу";
    takeChange();
  } else {
    changeButton.innerHTML = "Сдача";
    for (let i = 0; i < coins.length; i++) {
      coins[i].remove();
    }
  }
}

function takeChange() {
  if(balanceInput.value == 0) {
    return;
  }
  if(balanceInput.value >= 10) {
    balanceInput.value -= 10;
    tossCoin("10");
    takeChange();
  } else if (balanceInput.value >= 5) {
    balanceInput.value -= 5;
    tossCoin("5");
    takeChange();
  } else if (balanceInput.value >= 2) {
    balanceInput.value -= 2;
    tossCoin("2");
    takeChange();
  } else {
    balanceInput.value -= 1;
    tossCoin("1");
    takeChange();
  }
}

function tossCoin(cost) {
  let imgSrc = "";
  switch (cost) {
    case "10":
      imgSrc = "img/10rub.png";
      break;
    case "5":
      imgSrc = "img/5rub.png";
      break;
    case "2":
      imgSrc = "img/2rub.png";
      break;
    case "1":
      imgSrc = "img/1rub.png";
      break;
  }
  let changeBox = document.querySelector(".change-box");
  changeBox.style.position = "relative";
  let changeBoxCoords = changeBox.getBoundingClientRect();
  let randomWidth = getRandomInt(0, changeBoxCoords.width - 50);
  let randomHeight = getRandomInt(0, changeBoxCoords.height - 50);
 // console.log(randomWidth, randomHeight);
  // let randomWith = getRandomInt(changeBoxCoords.x, changeBoxCoords.x + changeBoxCoords.with);
  // let randomHeight = getRandomInt(changeBoxCoords.y, changeBoxCoords.y + changeBoxCoords.height);
  let coin = document.createElement("img");
  coin.setAttribute('src', imgSrc);
  coin.style.width = "50px";
  coin.style.height = "50px";
  coin.style.cursor = "pointer";
  coin.style.position = "absolute";
  coin.style.top = randomHeight + "px";
  coin.style.left = randomWidth + "px";
  changeBox.append(coin);
  
  coin.onclick = function() {
    coin.remove();
  }
  // changeBox.append(coin);//append добавляет в конец внутри элемеента
  // changeBox.prepend(coin); //добавляет в начало внутри элемеента
  // changeBox.before(coin); // добавляет перед элемеентом
  // changeBox.after(coin); // добавляет после внутри элемеента
  // changeBox.replaceWith(coin); // заменяет элемент - 1 раз
  
 // changeBox.innerHTML += '<img src="img/10rub.png" class="coin">';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
