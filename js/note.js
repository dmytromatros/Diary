"use strict";

let textarea = document.querySelectorAll(".textarea-note");
let textareaHidden = document.querySelectorAll(".textarea-note-hidden");
let noteBottomBtn = document.querySelector(".notes-block-main__btn");
let allNotes = document.querySelectorAll(".one-note");
let fzCount = 24;

programStart();

window.addEventListener("resize", function () {
  containerWidth = container.offsetWidth;
  noteBottomBtn.style.width = `${containerWidth - 40}px`;
});
window.addEventListener("click", function () {
  containerWidth = container.offsetWidth;
  noteBottomBtn.style.width = `${containerWidth - 40}px`;
});

// Start the programe, creating the notes
function programStart() {
  textAreaAdjust();
  fontSize();
  notemovements();
  addNewNote();
  removeOneNote();
  onSaveBtn();

  let storageNotesCount = localStorage.getItem("notesCount");

  if (storageNotesCount < 1) {
    createNewNote();
    console.log(storageNotesCount);
  } else if ((storageNotesCount) => 1) {
    for (let index = 0; index < storageNotesCount; index++) {
      createNewNote();
    }
    allNotes = document.querySelectorAll(".one-note");
    for (let index = 0; index < allNotes.length; index++) {
      allNotes[index].querySelector(".one-note__title input").value =
        localStorage.getItem(`note[${index}]_title`);
      allNotes[index].querySelector(".textarea-note").value =
        localStorage.getItem(`note[${index}]_text`);
      let noteHeight = localStorage.getItem(`note[${index}]_height`);
      allNotes[index].querySelector(
        ".textarea-note"
      ).style.height = `${noteHeight}px`;
    }
  }
}

// Textarea height adaptive to the text height
function textAreaAdjust() {
  textarea.forEach((e) => {
    let textHiddenInThis = e.parentElement.querySelector(
      ".textarea-note-hidden"
    );
    e.addEventListener("keydown", () => {
      textHiddenInThis.value = e.value;
      e.style.height = `${textHiddenInThis.scrollHeight}px`;
    });
    e.addEventListener("keyup", () => {
      textHiddenInThis.value = e.value;
      e.style.height = `${textHiddenInThis.scrollHeight}px`;
    });
  });
}

// Font resizer btn
function fontSize() {
  let plus = document.querySelector(".notes-block-main__font-plus");
  let minus = document.querySelector(".notes-block-main__font-minus");
  let countSpan = document.querySelector(".notes-block-main__font-count");
  textarea = document.querySelectorAll(".textarea-note");
  textareaHidden = document.querySelectorAll(".textarea-note-hidden");
  plus.onclick = function () {
    if (fzCount >= 38) {
      plus.setAttribute("disabled", "true");
    }
    if (fzCount >= 8) {
      minus.removeAttribute("disabled", "true");
    }
    fzCount += 2;
    countSpan.innerHTML = `${fzCount}`;
    textarea.forEach((e) => {
      e.style.fontSize = `${fzCount}px`;
    });
    textareaHidden.forEach((e) => {
      e.style.fontSize = `${fzCount}px`;
    });
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
    textarea.forEach((e) => {
      e.style.fontSize = `${fzCount}px`;
    });
    textareaHidden.forEach((e) => {
      e.style.fontSize = `${fzCount}px`;
    });
  };
}

// Movements of notes by the coursor
function notemovements() {
  allNotes.forEach((e) => {
    let moveBtn = e.querySelector(".one-note__move-note");
    let mouseMove = function () {
      e.style.position = "absolute";
      e.style.left = event.pageX - 200 + "px";
      e.style.top = event.pageY - 70 + "px";
    };
    moveBtn.addEventListener("mousedown", () => {
      moveBtn.style.width = "40px";
      moveBtn.style.height = "40px";
      e.style.zIndex = "9";
      e.addEventListener("mousemove", mouseMove);
    });
    e.addEventListener("mouseup", () => {
      moveBtn.style.width = "28px";
      moveBtn.style.height = "28px";
      e.removeEventListener("mousemove", mouseMove);
      e.style.zIndex = "1";
    });
  });
}

// Code to add , save
function addNewNote() {
  let addNewNoteBtn = document.querySelector(".notes-block-main__add-btn");
  addNewNoteBtn.addEventListener("click", () => {
    createNewNote();
  });
}

// New note
function createNewNote() {
  let newNote = document.querySelector(".example-note").cloneNode(true);
  newNote.classList.add("one-note");
  newNote.classList.remove("example-note");
  newNote.classList.remove("example");
  randomColor(newNote);
  document.querySelector(".notes-block-main__inner").append(newNote);
  allNotes = document.querySelectorAll(".one-note");
  reloader();
}

// Remove one note by click ox it
function removeOneNote() {
  allNotes.forEach((e) => {
    e.querySelector(".one-note__remove-all-btn").addEventListener(
      "click",
      () => {
        e.remove();
      }
    );
  });
}

// Function to randomize the background-color
function randomColor(newNode) {
  let colorCheck = Math.floor(Math.random() * 10);
  if (colorCheck == 1) {
  } else if (colorCheck == 2) {
    newNode.style.backgroundColor = "rgb(251, 255, 146)";
  } else if (colorCheck == 3) {
    newNode.style.backgroundColor = "rgb(255, 146, 146)";
  } else if (colorCheck == 4) {
    newNode.style.backgroundColor = "rgb(161, 255, 146)";
  } else if (colorCheck == 5) {
    newNode.style.backgroundColor = "rgb(146, 250, 255)";
  } else if (colorCheck == 6) {
    newNode.style.backgroundColor = "rgb(175, 146, 255)";
  } else if (colorCheck == 7) {
    newNode.style.backgroundColor = "rgb(255, 146, 242)";
  } else if (colorCheck == 8) {
    newNode.style.backgroundColor = "rgb(161, 255, 146)";
  } else if (colorCheck == 9) {
    newNode.style.backgroundColor = "rgb(251, 255, 146)";
  } else {
    newNode.style.backgroundColor = "rgb(255, 146, 146)";
  }
}

// Funtion to reload all the functions after adding new note
function reloader() {
  fontSize();
  notemovements();
  removeOneNote();
  textAreaAdjust();
}

// On save btn click
function onSaveBtn() {
  let saveAllNote = document.querySelector(".notes-block-main__save-btn");
  saveAllNote.addEventListener("click", () => {
    localStorage.clear();
    allNotes = document.querySelectorAll(".one-note");
    let notesCount = allNotes.length;
    localStorage.setItem("notesCount", notesCount);
    for (let index = 0; index < notesCount; index++) {
      let title = allNotes[index].querySelector(".one-note__title input").value;
      localStorage.setItem(`note[${index}]_title`, title);
      let textInside = allNotes[index].querySelector(".textarea-note").value;
      localStorage.setItem(`note[${index}]_text`, textInside);
      let noteHeight = allNotes[index]
        .querySelector(".textarea-note")
        .getBoundingClientRect().height;
      console.log(noteHeight);
      localStorage.setItem(`note[${index}]_height`, noteHeight);
    }
  });
}
