"use strict";

let textarea = document.querySelector(".textarea-note");
let textareaHidden = document.querySelector(".textarea-note-hidden");
let noteBottomBtn = document.querySelector(".notes-block-main__btn");

let allNotes = document.querySelectorAll(".one-note");

textAreaAdjust(textarea);
fontSize();
notemovements();

window.addEventListener("resize", function () {
  containerWidth = container.offsetWidth;
  noteBottomBtn.style.width = `${containerWidth - 40}px`;
});
window.addEventListener("click", function () {
  containerWidth = container.offsetWidth;
  noteBottomBtn.style.width = `${containerWidth - 40}px`;
});

function textAreaAdjust(that) {
  textarea.addEventListener("keydown", () => {
    textareaHidden.value = that.value;
    that.style.height = `${textareaHidden.scrollHeight}px`;
  });
  textarea.addEventListener("keyup", () => {
    textareaHidden.value = that.value;
    that.style.height = `${textareaHidden.scrollHeight}px`;
  });
}

function fontSize() {
  let plus = document.querySelector(".notes-block-main__font-plus");
  let minus = document.querySelector(".notes-block-main__font-minus");
  let countSpan = document.querySelector(".notes-block-main__font-count");
  let fzCount = 24;

  plus.onclick = function () {
    if (fzCount >= 38) {
      plus.setAttribute("disabled", "true");
    }
    if (fzCount >= 8) {
      minus.removeAttribute("disabled", "true");
    }
    fzCount += 2;
    countSpan.innerHTML = `${fzCount}`;
    textarea.style.fontSize = `${fzCount}px`;
    textareaHidden.style.fontSize = `${fzCount}px`;
  };
  minus.onclick = function () {
    if (fzCount <= 10) {
      minus.setAttribute("disabled", "true");
    }
    if (fzCount <= 40) {
      plus.removeAttribute("disabled", "true");
    }
    fzCount -= 2;
    countSpan.innerHTML = `${fzCount}`;
    textarea.style.fontSize = `${fzCount}px`;
    textareaHidden.style.fontSize = `${fzCount}px`;
  };
}

function notemovements() {
  allNotes.forEach((e) => {
    let mouseMove = function () {
      e.style.position = "absolute";
      e.style.left = event.pageX - e.offsetWidth / 1.5 + "px";
      e.style.top = event.pageY - e.offsetHeight / 2 + "px";
    };
    e.addEventListener("mousedown", () => {
      e.addEventListener("mousemove", mouseMove);
    });
    e.addEventListener("mouseup", () => {
      e.removeEventListener("mousemove", mouseMove);
    });
  });
}
