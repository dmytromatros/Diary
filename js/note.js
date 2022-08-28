"use strict";

let textarea = document.querySelector(".textarea-note");
let textareaHidden = document.querySelector(".textarea-note-hidden");

textAreaAdjust(textarea);
fontSize();

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
  let plus = document.querySelector(".plus");
  let minus = document.querySelector(".minus");
  let countSpan = document.querySelector(".fz-count");
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
