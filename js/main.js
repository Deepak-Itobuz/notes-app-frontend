const addBtn = document.querySelector(".add-button");
const addIcon = document.querySelector(".add-icon");

const checkIcon = document.querySelector(".check-icon");

const searchBtn = document.querySelector(".search-button");
const input = document.querySelector(".write-note");
const notesBox = document.querySelector(".notes");
const notesCount = document.querySelector(".note-count");

const listNote = document.querySelector(".note-count");

let i = 0;

addBtn.addEventListener("click", () => {
  add();
  get();
});

function add() {
  let text = "";
  input.classList.toggle("d-none");
  checkIcon.classList.toggle("d-none");
  addIcon.classList.toggle("d-none");
  if (checkIcon.classList.contains("d-none")) {
    text = input.firstElementChild.value;
    input.firstElementChild.value = "";
    let newNote = document.createElement("li");
    newNote.classList.add("list-note");
    newNote.innerHTML = text;
    i++;
    notesBox.appendChild(newNote);
    notesCount.innerHTML = i;
  }
}

async function get() {
  const response = await fetch("http://127.0.0.1:8085")
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));

  console.log(response);
}
