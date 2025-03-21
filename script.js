"use strict";
const billInput = document.querySelector("#bill");
const customTip = document.querySelector('#custom-tip')
const tipBtn = document.querySelectorAll(".tip-btn");
const peopleNumber = document.querySelector("#people");
const tipPerPerson = document.querySelector("#tip-person");
const totalPerPerson = document.querySelector(".total-person");
const error = document.querySelector('#error-people')

  let selectedTip = 0
  tipBtn.forEach(function(btn){
    btn.addEventListener('click', function(){
      if (this.classList.contains("custom")) {
        customTip.style.display = "block";
        customTip.focus();
      } else {
        selectedTip = parseFloat(this.dataset.tip);
        customTip.style.display = "none";
        customTip.value = ""; // Reset custom input when selecting preset buttons
        calcTip();
      }
    })
  })

  function calcTip() {
  let people = parseInt(peopleNumber.value)
    let billAmount = parseFloat(billInput.value)
    if (isNaN(billAmount) || billAmount <= 0) {
      billInput.style.border = '1px solid red'
      return;
  } else{
    billInput.style.border = '1px solid black'

  }

  customTip.addEventListener("input", function () {
    let customValue = parseFloat(this.value);
    if (!isNaN(customValue) && customValue > 0) {
      selectedTip = customValue;
      calcTip();
    }
  });

  if (isNaN(people) || people <= 0) {
    peopleNumber.style.border = '1px solid red';
      error.textContent="Can't be zero";
      return;
  } else{
    peopleNumber.style.border = '1px solid black';

  }
  let tipAmount = (billAmount * selectedTip) / 100;
  let total = billAmount + tipAmount 
  let amountPerPerson = total / people

  tipPerPerson.textContent = tipAmount/people.toFixed(2)
  totalPerPerson.textContent = amountPerPerson.toFixed(2)
  }
  

