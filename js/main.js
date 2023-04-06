const addBtn = document.querySelector(".add-button");
const editBtn = document.querySelectorAll(".edit-button");
const deleteBtn = document.querySelectorAll(".delete-button");
const checkBtn = document.querySelector(".check-button");
const saveBtn = document.querySelector(".save-button");
const searchBtn = document.querySelector(".search-button");
const closeBtn = document.querySelector(".close-button");
const input = document.querySelector(".write-note");
const editInput = document.querySelector(".edit-note");
const notesBox = document.querySelector(".notes");
const notesCount = document.querySelector(".note-count");
const listNote = document.querySelector(".note-count");

async function get() {
  let i = 0;
  const response = await fetch("http://127.0.0.1:8085")
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));
  let targetData = JSON.parse(response[0].data)
  for (let j = 0; j < targetData.length; j++) {
    let oldNote = document.createElement("li");
    oldNote.classList.add("list-note");
    oldNote.dataset.id = targetData[j]._id;
    let content = document.createElement('p');
    content.innerHTML = targetData[j].notes;
    let buttonTrash = document.createElement('button');
    buttonTrash.classList.add('delete-button');
    buttonTrash.innerHTML = `<i class="fas fa-solid fa-trash"></i>`
    oldNote.appendChild(content)
    oldNote.appendChild(buttonTrash)
    notesBox.appendChild(oldNote);
    i++;
    notesCount.innerHTML = i;
    }
};

async function add() {
  input.classList.toggle("d-none");
  checkBtn.classList.toggle("d-none");
  addBtn.classList.toggle("d-none");
  closeBtn.classList.toggle("d-none");
}

async function postData() {
  let text = "";
  text = input.value;
  if (text.trim() !== "") {
    input.value = "";
    const response = await fetch("http://127.0.0.1:8085/create", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notes: text
      })
    })
      .then((data) => {

        return data.json();
      })
      .catch((err) => console.log(err));
    console.log(response[0].message);
  }
  else
    alert("field cannot be empty")
  notesBox.innerHTML = "";
  get();
}

async function deleteData(data) {
  let id = data.toString();
  const response = await fetch("http://127.0.0.1:8085/delete", {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id
    })
  })
    .then((data) => {

      return data.json();
    })
    .catch((err) => console.log(err));
  console.log(response[0].message);
  notesBox.innerHTML = "";
  get();
}

async function updateData(oldData, newData) {
  const response = await fetch("http://127.0.0.1:8085/update", {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([oldData, newData])
  })
    .then((data) => {

      return data.json();
    })
    .catch((err) => console.log(err));
  console.log(response[0].message);
  notesBox.innerHTML = "";
  get();
}

addBtn.addEventListener("click", () => {
  add();
});

get();

closeBtn.addEventListener('click', () => {
  input.classList.add("d-none");
  checkBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  editInput.classList.add("d-none");
  closeBtn.classList.add("d-none");
  saveBtn.classList.add("d-none")
})

checkBtn.addEventListener('click', async () => {
  await postData();
  input.classList.add("d-none");
  editInput.classList.add("d-none");
  addBtn.classList.remove("d-none");
  closeBtn.classList.add("d-none");
  checkBtn.classList.add("d-none");
})

notesBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('list-note')) {
    editInput.classList.remove('d-none');
    closeBtn.classList.remove('d-none');
    saveBtn.classList.remove('d-none');
    editInput.value = e.target.textContent;
    let oldValue = e.target.textContent;
    saveBtn.onclick = async() =>{
      let newValue = editInput.value;
      await updateData(oldValue, newValue)
      editInput.classList.add('d-none');
      addBtn.classList.remove('d-none');
      closeBtn.classList.add('d-none');
      saveBtn.classList.add('d-none');
    }
  }
  else if (e.target.classList.contains('delete-button')) {
    deleteData(e.target.parentElement.dataset.id)

  }
  else if (e.target.classList.contains('fa-trash')) {
    deleteData(e.target.parentElement.parentElement.dataset.id)
  }

})

