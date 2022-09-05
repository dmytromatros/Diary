"use strict";
let allLi = document.querySelectorAll(".dashboard__li");
// let container = document.querySelector(".coontainer");
// let containerWidth = container.offsetWidth;
let dashboard = document.querySelector(".dashboard");
let mainTitle = document.querySelectorAll(".main__title");

// mainTitle.forEach((e) => {
//   e.style.width = `${containerWidth - 40}px`;
// });

activeli();
changeWorckSpace();
titleOpacity();
openToFullSize();

function activeli() {
  allLi.forEach((li) => {
    li.addEventListener("click", () => {
      container.querySelector(".welcome-block").style.display = "none";
      allLi.forEach((e) => {
        e.classList.remove("active-dashboard-li");
      });
      li.classList.add("active-dashboard-li");
    });
  });
}

function changeWorckSpace() {
  allLi.forEach((li) => {
    li.addEventListener("click", () => {
      document.querySelectorAll(".coontainer>div").forEach((e) => {
        e.classList.remove("active-main-block");
      });
      if (li.classList.contains("plan-li")) {
        document
          .querySelector(".plan-list-main")
          .classList.add("active-main-block");
      } else if (li.classList.contains("note-li")) {
        document
          .querySelector(".notes-block-main")
          .classList.add("active-main-block");
      }
    });
  });
}

function titleOpacity() {
  let title = document.querySelectorAll(".main__title");
  window.addEventListener("mousemove", (e) => {
    title.forEach((tit) => {
      e.clientY <= 70
        ? ((tit.style.opacity = "0.2"), (tit.style.zIndex = "0"))
        : ((tit.style.opacity = "1"), (tit.style.zIndex = "10"));
    });
  });
}

function openToFullSize() {
  let openBtn = document.querySelector(".dashbboard__open-menu");
  openBtn.addEventListener("click", () => {
    dashboard.classList.toggle("dashboard__small");
    if (dashboard.classList.contains("dashboard__small")) {
      container.style.marginLeft = "55px";
    } else {
      container.style.marginLeft = "250px";
    }
  });
}

window.addEventListener("resize", function () {
  containerWidth = container.offsetWidth;
  mainTitle.forEach((e) => {
    e.style.width = `${containerWidth - 40}px`;
  });
});
window.addEventListener("click", function () {
  containerWidth = container.offsetWidth;
  mainTitle.forEach((e) => {
    e.style.width = `${containerWidth - 40}px`;
  });
});
