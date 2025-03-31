"use strict";
const billInput = document.querySelector("#bill");
const customTip = document.querySelector(".custom");
const tipBtn = document.querySelectorAll(".tip-btn");
const peopleNumber = document.querySelector("#people");
const tipPerPerson = document.querySelector("#tip-person");
const totalPerPerson = document.querySelector("#total-person");
const error = document.querySelector("#error-people");
const reset = document.querySelector(".reset");

let selectedTip = 0;

function createCustomInput() {
  let input = document.createElement("input");
  input.placeholder = "Enter Tip %";
  input.classList.add("custom-tip-input");
  input.style.maxWidth = "60px"; 
  input.style.height = "20px";
  // input.style.padding = "10px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "5px";
  input.style.textAlign = "center";

  // Replace custom button with input
  customTip.replaceWith(input);
  input.focus();

  // Handle input change
  input.addEventListener("input", function () {
    let customValue = parseFloat(input.value);
    if (!isNaN(customValue) && customValue > 0) {
      selectedTip = customValue;
      calcTip();
    }
  });


  input.addEventListener("blur", () => {
    if (!input.value) {
      input.replaceWith(customTip); 
    }
  });

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      input.blur(); 
    }
  });
}

tipBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (this.classList.contains("custom")) {
      createCustomInput();
    } else {
      selectedTip = parseFloat(this.dataset.tip);
      calcTip();
    }
  });
});

function calcTip() {
  let people = parseInt(peopleNumber.value);
  let billAmount = parseFloat(billInput.value);

  if (isNaN(billAmount) || billAmount <= 0) {
    billInput.style.border = "1px solid red";
    return;
  } else {
    billInput.style.border = "1px solid black";
  }

  if (isNaN(people) || people <= 0) {
    peopleNumber.style.border = "1px solid red";
    error.textContent = "Can't be zero";
    return;
  } else {
    peopleNumber.style.border = "1px solid black";
    error.textContent = ""
  }
  let tipAmount = (billAmount * selectedTip) / 100;
  let total = billAmount + tipAmount;
  let amountPerPerson = total / people;

  tipPerPerson.textContent = `$${(tipAmount / people).toFixed(2)}`;
  totalPerPerson.textContent = `$${amountPerPerson.toFixed(2)}`;
}

reset.addEventListener("click", function () {
  peopleNumber.value = "";
  billInput.value = "";
  tipPerPerson.textContent = "$0.00";
  totalPerPerson.textContent  = "$0.00";
});

// function highlightBorder(inputField) {
//   inputField.addEventListener("focus", function () {
//     this.style.border = "2px solid #26c0ab"; 
//   });

//   inputField.addEventListener("blur", function () {
//     this.style.border = "1px solid #ccc"; 
//   });
// }

// highlightBorder(billInput);
// highlightBorder(peopleNumber);
// highlightBorder(customTip);