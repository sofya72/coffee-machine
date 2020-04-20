"use strict"

// window.document.dcumentElement.body
// -----------------------------------Устаревшие методы----------------
/* let coffeeMachine = document.getElementById("coffee"); // Поиск по ID
console.log(coffeeMachine);
let images = document.getElementsByTagName("img"); // Поиск по тэгу
console.log(images);
let coffeeItems = document.getElementsByClassName("coffee-item"); // Поиск по классу
console.log(coffeeItems);
let firstImage = coffeeItems[0].getElementsByTagName("img"); // Поиск по тэгу
console.log(firstImage[0]); */
//-------------------------------------------------------------------------

//------------------------Современные методы-----------------------------------
/*let coffeeMachine = document.querySelector("#coffee");
console.log(coffeeMachine);
let image = document.querySelector("img"); // если элементов несколько, найдет только первый
console.log(image);
let coffeeItems = document.querySelectorAll(".coffee-item"); // чтобы выбрать все
console.log(coffeeItems);
let itemImages = document.querySelectorAll(".coffee-item img"); // чтобы выбрать все
console.log(itemImages);
let cupImages = document.querySelectorAll(".coffee-item img, .coffee-cup img"); // чтобы выбрать все кружки кофе
console.log(cupImages);*/

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

//------------------------Работа с элементами-----------------------------------
// Изменение CSS свойств
/*let coffeeMachine = document.querySelector(".coffee-machine");
coffeeMachine.style.border = "10px solid darkblue";
coffeeMachine.style.borderRadius = "25px";
coffeeMachine.style.position = "absolute";
coffeeMachine.style.top = "15px";
coffeeMachine.style.left = "150px";
let coffeeMachineTop = coffeeMachine.style.top;
console.log( parseInt(coffeeMachineTop) );*/
// Изменение атрибутов
/*let balance = document.querySelector("input[type='text']");
let balanceType = balance.getAttribute("type");
console.log(balanceType);
balance.setAttribute("type", "date");

console.log( balance.hasAttribute("placeholder") );
balance.removeAttribute("aria-label");*/
/*balance.value = 500; // == balance.setAttribute('value', 500);
console.log(balance.value); // == balance.getAttribute('value');*/
  
// Изменение классов
/*let changeButton = document.querySelector(".btn");
console.log(changeButton.classList);
changeButton.classList.remove("btn-primary");
changeButton.classList.add("btn-success");*/
// changeButton.classList.toggle("ml-5"); // Вкл. / Выкл.

// Изменение содержимого элементов
/*let displayText = document.querySelector(".display-text");
console.log( displayText.innerHTML );
console.log( displayText.innerText );*/
//displayText.innerHTML = "<b>Готовим кофе</b>";
//displayText.innerText = "<b>Готовим кофе</b>";

//События и слушатели событий

//Мышь - click mouserover mouseup mousedown mousemove
//для input - focus change

// 1. С помощью атрибута

//this возвращает объект к которому обращено свойство или метод
// <div class="div coffee-item" onclick="buyCoffee('Americano', 50, this)";>
// То же самое что
/*console.log(this);
let elem = document.querySelectorAll(".coffee-item");
elem[1].onlock = function () {
  buyCoffee('Americano', 50, this);
}*/
//

//--------------------------Планирование---------------------------------------
// таймаут
/*setTimeout(function () {
  alert("Таймаут отработал");
}, 5000); //5 секунд */

/*let timeout = setTimeout(paintBody, 5000, 'aqua');
let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearTimeout(timeout);
}
/*setTimeout(function () { // функция-обертка
 paintBody (); 
}, 5000);*/


/*function paintBody(color) {
  document.body.style.background = color;
} */

/*let coffeeMachine = document.querySelector('.coffee-machine');
coffeeMachine.style.position = "absolute";*/

/* let interval = setInterval(trashConsole, 1000);

let changeButton = document.querySelector(".btn");
changeButton.onclick = function () {
  clearInterval(interval);
}

function trashConsole() {
  console.log(Math.random());
} */



