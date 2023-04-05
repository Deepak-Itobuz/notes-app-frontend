const addBtn = document.querySelector(".add-button");


const editBtn = document.querySelectorAll(".edit-button");
const deleteBtn = document.querySelectorAll(".delete-button");

const checkBtn = document.querySelector(".check-button");

const searchBtn = document.querySelector(".search-button");
const closeBtn = document.querySelector(".close-button");
const input = document.querySelector(".write-note");
const editInput = document.querySelector(".edit-note");
const notesBox = document.querySelector(".notes");
const notesCount = document.querySelector(".note-count");

const listNote = document.querySelector(".note-count");

let i = 0;





// get();

async function get() {
  const response = await fetch("http://127.0.0.1:8085")
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .catch((err) => console.log(err));

  // console.log(JSON.parse(response[0].data));
  let targetData = JSON.parse(response[0].data)
  for (let j = 0; j < targetData.length; j++) {
    let oldNote = document.createElement("li");
    oldNote.classList.add("list-note");
    oldNote.dataset.id = targetData[j]._id;
    oldNote.innerHTML = targetData[j].notes;
    oldNote.innerHTML = ` <p>${targetData[j].notes}</p>
     <button class="delete-button" onclick=deleteData('${targetData[j]._id}')><i class="fas fa-solid fa-trash"></i></button>`
    notesBox.appendChild(oldNote);

    i++;
    notesCount.innerHTML = i;

    const note = document.querySelectorAll(".list-note");
    note.forEach(element => {

          element.onclick =  () => {
            // console.log(element);
            console.log("5");
            editInput.classList.remove('d-none');
            addBtn.classList.add('d-none');
            closeBtn.classList.remove('d-none');
            checkBtn.classList.remove('d-none');
          }
        });
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
    // let newNote = document.createElement("li");
    // newNote.classList.add("list-note");
    // newNote.innerHTML = text;
    i++;
    //   notesBox.innerHTML+=` <li class="list-note ">
    //   <p>${text}</p>
    //  <div class="options">
    //   <button class="edit-button"><i class="fas fa-solid fa-pen"></i></button>
    //   <button class="delete-button"><i class="fas fa-solid fa-trash"></i></button>
    //  </div>
    // </li>`
    notesCount.innerHTML = i;
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
    console.log(response.body);
  }
  else
    alert("field cannot be empty")

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
  let id = data.toString();
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

})

checkBtn.addEventListener('click', async () => {
  // if(editInput.classList.contains('d-none'))
  await postData();

  // if(input.classList.contains('d-none'))
  // await updateData();

  input.classList.add("d-none");
  editInput.classList.add("d-none");

  notesBox.innerHTML = "";
  get();
  addBtn.classList.remove("d-none");
  closeBtn.classList.add("d-none");

  checkBtn.classList.add("d-none");

})

// console.log(deleteBtn);
// deleteBtn.forEach(element => {

//   element.addEventListener('click', () => {
//     console.log(element);
//     console.log("5");
//   })
// });

// note.forEach(element => {

//     element.addEventListener('click', () => {
//       console.log(element);
//       console.log("5");
//     })
//   });

