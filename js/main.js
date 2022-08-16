"use strict";
listFunction();
function listFunction() {
  let lableChek = document.querySelectorAll(".plan-list .plan-list__lable");
  let addBtn = document.querySelector(".plan-list__add-btn");
  // let planInner = document.querySelector(".plan-list__inner");
  let removeBtn = document.querySelector(".plan-list__remove-btn");
  let saveList = document.querySelector(".plan-list__save-btn");

  let planField;
  let newField;
  let arrPlanLielr;
  let fieldCount = localStorage.getItem("fieldCount");

  if (fieldCount <= 0) {
    fieldCount = 1;
    newField = document.querySelector(".example-list-field").cloneNode(true);
    newField.classList.add("plan-list__field");
    newField.classList.remove("example-list-field");
    document.querySelector(".plan-list__inner").append(newField);
    lableChek = document.querySelectorAll(".plan-list .plan-list__lable");

    lableChek.forEach((e) => {
      let eventFunc = function () {
        planField = e.parentElement;
        planField.classList.toggle("disabled-field");
        e.classList.toggle("active-lable");
      };
      e.onclick = eventFunc;
    });
  } else if (fieldCount > 0) {
    console.log(fieldCount);
    for (let index = 0; index < fieldCount; index++) {
      let obj = localStorage.getItem(`field ${index}`);
      obj = JSON.parse(obj);
      console.log(obj);

      newField = document.querySelector(".example-list-field").cloneNode(true);
      newField.classList.add("plan-list__field");
      newField.classList.remove("example-list-field");
      newField.lastElementChild.value = obj.value;
      if (obj.enabled == true) {
        newField.classList.add("disabled-field");
        newField.firstElementChild.classList.add("active-lable");
      }

      document.querySelector(".plan-list__inner").append(newField);
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
  }

  lableChek.forEach((e) => {
    let eventFunc = function () {
      planField = e.parentElement;
      planField.classList.toggle("disabled-field");
      e.classList.toggle("active-lable");
    };
    e.onclick = eventFunc;
  });

  addBtn.addEventListener("click", () => {
    arrPlanLielr = document.querySelectorAll(".plan-list__field");
    fieldCount = arrPlanLielr.length + 1;
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
    let allInputsList = document.querySelectorAll(".plan-list__input");
    fieldCount = fieldCount - removeArr.length;
    for (let i = 0; i < allInputsList.length - 1; i++) {
      allInputsList[i].setAttribute("placeholder", `Exercise ${i + 1}`);
    }
  });

  saveList.addEventListener("click", () => {
    localStorage.clear();
    localStorage.setItem("fieldCount", fieldCount);
    // let c = localStorage.getItem("fieldCount");
    // console.log(c);
    arrPlanLielr = document.querySelectorAll(".plan-list__field");

    for (let index = 0; index < arrPlanLielr.length; index++) {
      let fieldObj = {
        enabled: false,
        value: "text",
      };

      if (arrPlanLielr[index].classList.contains("disabled-field")) {
        fieldObj.enabled = true;
      }
      fieldObj.value = arrPlanLielr[index].lastElementChild.value;

      let storageObj = JSON.stringify(fieldObj);
      localStorage.setItem(`field ${index}`, storageObj);
    }
    // for (let index = 0; index < arrPlanLielr.length; index++) {
    //   let a = localStorage.getItem(`field ${index}`);
    //   console.log(a);
    // }
  });
}
