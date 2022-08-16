"use strict";
disableExercise();
function disableExercise() {
  let lableChek = document.querySelectorAll(".plan-list .plan-list__lable");
  let addBtn = document.querySelector(".plan-list__add-btn");
  let planInner = document.querySelector(".plan-list__inner");
  let removeBtn = document.querySelector(".plan-list__remove-btn");
  let planField;
  let newField;
  let arrPlanLielr;

  lableChek.forEach((e) => {
    let eventFunc = function () {
      planField = e.parentElement;
      planField.classList.toggle("disabled-field");
      e.classList.toggle("active-lable");
      console.log(e);
    };
    e.onclick = eventFunc;
    console.log(lableChek);
  });

  addBtn.addEventListener("click", () => {
    arrPlanLielr = document.querySelectorAll(".plan-list__field");
    newField = document.querySelector(".example-list-field").cloneNode(true);
    newField.classList.add("plan-list__field");
    newField.classList.remove("example-list-field");
    newField.lastElementChild.setAttribute(
      "placeholder",
      `Exercise ${arrPlanLielr.length + 1}`
    );
    if (arrPlanLielr.length > 0) {
      arrPlanLielr[arrPlanLielr.length - 1].after(newField);
    } else {
      document.querySelector(".plan-list__inner").prepend(newField);
    }
    lableChek = document.querySelectorAll(".plan-list .plan-list__lable");

    lableChek.forEach((e) => {
      let eventFunc = function () {
        planField = e.parentElement;
        planField.classList.toggle("disabled-field");
        e.classList.toggle("active-lable");
      };
      e.onclick = eventFunc;
    });
  });

  removeBtn.addEventListener("click", () => {
    let removeArr = document.querySelectorAll(".disabled-field");
    if (removeArr.length > 0) {
      removeArr.forEach((e) => {
        e.remove();
      });
    } else {
      console.log("nothing remove");
    }
  });
}
