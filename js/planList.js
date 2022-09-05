"use strict";
listFunction();

let container = document.querySelector(".coontainer");
let bottomBtn = document.querySelector(".plan-list__big-screen-btn");
let containerWidth = container.offsetWidth;
containerWidth = container.offsetWidth;
bottomBtn.style.width = `${containerWidth - 40}px`;
window.addEventListener("resize", function () {
  containerWidth = container.offsetWidth;
  bottomBtn.style.width = `${containerWidth - 40}px`;
});
window.addEventListener("click", function () {
  containerWidth = container.offsetWidth;
  bottomBtn.style.width = `${containerWidth - 40}px`;
});

function listFunction() {
  // localStorage.clear();

  let plnaListList = localStorage.getItem("listCount");
  if (plnaListList == "NaN") {
    plnaListList = 0;
  }

  let addNewList = document.querySelectorAll(".plan-list__add-new-list");
  let saveList = document.querySelectorAll(".plan-list__save-btn");
  // let removeList = document.querySelector(".plan-list__remove-list");
  let removeTickInList;
  addNewList.forEach((e) => {
    e.addEventListener("click", () => {
      let newList = document.querySelector(".exampl-list").cloneNode(true);
      newList.classList.add("plan-list");
      newList.classList.remove("exampl-list");
      document.querySelector(".plan-list-main__inner").append(newList);
      plnaListList++;

      afterAddFunc(newList, 0, 0);
    });
  });

  let afterAddFunc = function (newNode, fieldCount, listIndex, title) {
    randomColor(newNode);
    let lableChek = newNode.querySelectorAll(".plan-list .plan-list__lable");
    let addBtn = newNode.querySelector(".plan-list__add-btn");
    let removeBtn = newNode.querySelector(".plan-list__remove-btn");
    let planField;
    let newField;
    let arrPlanLielr;

    if (fieldCount <= 0) {
      fieldCount = 1;
      newField = document.querySelector(".example-list-field").cloneNode(true);
      newField.classList.add("plan-list__field");
      newField.classList.remove("example-list-field");

      newNode.querySelector(".plan-list__inner").append(newField);
      lableChek = newNode.querySelectorAll(".plan-list .plan-list__lable");

      lableChek.forEach((e) => {
        let eventFunc = function () {
          planField = e.parentElement;
          planField.classList.toggle("disabled-field");
          e.classList.toggle("active-lable");
        };
        e.onclick = eventFunc;
      });
    } else if (fieldCount > 0) {
      for (let index = 0; index < fieldCount; index++) {
        let obj = localStorage.getItem(`list${listIndex} field${index}`);
        obj = JSON.parse(obj);
        newField = document
          .querySelector(".example-list-field")
          .cloneNode(true);
        newField.classList.add("plan-list__field");
        newField.classList.remove("example-list-field");

        newField.lastElementChild.value = obj.value;
        if (newField.lastElementChild.value == "") {
          newField.lastElementChild.setAttribute(
            "placeholder",
            `Exercise ${index + 1}`
          );
        }
        if (obj.enabled == true) {
          newField.classList.add("disabled-field");
          newField.firstElementChild.classList.add("active-lable");
        }

        newNode.querySelector(".plan-list__inner").append(newField);
        newNode.querySelector(".plan-list__title-value").value = title;
      }
      lableChek = newNode.querySelectorAll(".plan-list .plan-list__lable");

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
      arrPlanLielr = newNode.querySelectorAll(".plan-list__field");
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
        newNode.querySelector(".plan-list__inner").prepend(newField);
      }
      lableChek = newNode.querySelectorAll(".plan-list .plan-list__lable");

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
      let removeArr = newNode.querySelectorAll(".disabled-field");
      if (removeArr.length > 0) {
        removeArr.forEach((e) => {
          e.remove();
        });
      }
      let allInputsList = newNode.querySelectorAll(".plan-list__input");
      fieldCount = fieldCount - removeArr.length;
      for (let i = 0; i < allInputsList.length - 1; i++) {
        allInputsList[i].setAttribute("placeholder", `Exercise ${i + 1}`);
      }
    });
    removeTickInList = document.querySelectorAll(
      ".plan-list-main .plan-list__remove-all-btn"
    );
    removeTickInList.forEach((e) => {
      e.onclick = function () {
        // console.log(removeTickInList);
        e.parentElement.parentElement.remove();
      };
    });
  };
  if (plnaListList > 0) {
    for (let index = 0; index < plnaListList; index++) {
      let newList = document.querySelector(".exampl-list").cloneNode(true);
      newList.classList.add("plan-list");
      newList.classList.remove("exampl-list");
      document.querySelector(".plan-list-main__inner").append(newList);
      let fieldCount = localStorage.getItem(`list${index} fieldcount`);
      let title = localStorage.getItem(`list${index} title`);
      afterAddFunc(newList, fieldCount, index, title);
    }
  }
  if (plnaListList <= 0) {
    let newList = document.querySelector(".exampl-list").cloneNode(true);
    newList.classList.add("plan-list");
    newList.classList.remove("exampl-list");
    document.querySelector(".plan-list-main__inner").append(newList);
    plnaListList++;
    afterAddFunc(newList, 0, 0);
  }
  saveList.forEach((e) => {
    e.addEventListener("click", () => {
      localStorage.clear();
      plnaListList = document.querySelectorAll(".plan-list").length;
      localStorage.setItem("listCount", plnaListList);
      plnaListList = document.querySelectorAll(".plan-list");
      for (let ind = 0; ind < plnaListList.length; ind++) {
        let fieldCount =
          plnaListList[ind].querySelectorAll(".plan-list__field");
        localStorage.setItem(`list${ind} fieldcount`, fieldCount.length);
        let title = plnaListList[ind].querySelector(
          ".plan-list__title-value"
        ).value;
        localStorage.setItem(`list${ind} title`, title);
        for (let fc = 0; fc < fieldCount.length; fc++) {
          let fieldObj = {
            enabled: false,
            value: "text",
          };
          if (fieldCount[fc].classList.contains("disabled-field")) {
            fieldObj.enabled = true;
          }
          fieldObj.value = fieldCount[fc].lastElementChild.value;
          let storageObj = JSON.stringify(fieldObj);
          localStorage.setItem(`list${ind} field${fc}`, storageObj);
        }
      }
    });
  });

  // removeList.addEventListener("click", () => {
  //   let listToRemove = document.querySelectorAll(".list-to-remove");
  //   let errorMes = document.querySelector(".plan-list__remove-list-helper");
  //   if (listToRemove.length > 0) {
  //     listToRemove.forEach((e) => {
  //       e.e.remove();
  //     });
  //   } else if (listToRemove.length <= 0) {
  //     errorMes.style.transform = "translateY(0)";
  //     setInterval(() => {
  //       errorMes.style.transform = "translateY(-200%)";
  //     }, 2000);
  //   }
  // });
}

function randomColor(newNode) {
  let colorCheck = Math.floor(Math.random() * 10);
  // console.log(colorCheck);
  if (colorCheck == 1) {
  } else if (colorCheck == 2) {
    newNode.style.backgroundColor = "rgb(255, 253, 216)";
  } else if (colorCheck == 3) {
    newNode.style.backgroundColor = "rgb(255, 216, 216)";
  } else if (colorCheck == 4) {
    newNode.style.backgroundColor = "rgb(217, 255, 216)";
  } else if (colorCheck == 5) {
    newNode.style.backgroundColor = "rgb(216, 221, 255)";
  } else if (colorCheck == 6) {
    newNode.style.backgroundColor = "rgb(207, 225, 216)";
  } else if (colorCheck == 7) {
    newNode.style.backgroundColor = "rgb(213, 216, 216)";
  } else if (colorCheck == 8) {
    newNode.style.backgroundColor = "rgb(217, 248, 216)";
  } else if (colorCheck == 9) {
    newNode.style.backgroundColor = "rgb(216, 221, 255)";
  } else {
    newNode.style.backgroundColor = "rgb(255, 216, 216)";
  }
}
