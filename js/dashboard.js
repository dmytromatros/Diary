"use strict";
activeli();

function activeli() {
  let allLi = document.querySelectorAll(".dashboard__li");
  allLi.forEach((li) => {
    li.addEventListener("click", () => {
      allLi.forEach((e) => {
        e.classList.remove("active-dashboard-li");
      });
      li.classList.add("active-dashboard-li");
    });
  });
}
