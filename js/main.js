const addBtn = document.querySelector(".add-button");
const editBtn = document.querySelectorAll(".edit-button");
const deleteBtn = document.querySelectorAll(".delete-button");
const checkBtn = document.querySelector(".check-button");
const saveBtn = document.querySelector(".save-button");
const searchBtn = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const closeBtn = document.querySelector(".close-button");
const input = document.querySelector(".write-note");
const editInput = document.querySelector(".edit-note");
const notesBox = document.querySelector(".notes");
const notesCount = document.querySelector(".note-count");
const statusBar = document.querySelector(".status");
const searchResult = document.querySelector(".search-result");
const searchMain = document.querySelector(".search-main");
const viewSelect = document.querySelector(".view-select");
const view = document.querySelectorAll(".view-list option");
const viewList = document.querySelector(".view-list");
const viewGrid = document.querySelector(".view-grid");
const confirmDelete = document.querySelector(".confirm-delete");
const yesBtn = document.querySelector(".yes-delete");
const noBtn = document.querySelector(".no-delete");

async function get() {
  let i = 0;
  const response = await fetch("http://127.0.0.1:8085")
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));
  let targetData = JSON.parse(response.data)
  for (let j = 0; j < targetData.length; j++) {
    let oldNote = document.createElement("li");
    oldNote.classList.add("list-note");
    oldNote.dataset.id = targetData[j]._id;
    let idNote = "index"+j;
    oldNote.setAttribute('id' , idNote )
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
    // console.log(response.message);
    statusBar.innerHTML = response.message
  }
  else
    alert("field cannot be empty")
  notesBox.innerHTML = "";
  get();
  setTimeout(renderStatus , 2000);
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
  // console.log(response[0].message);
  statusBar.innerHTML = response.message;
  notesBox.innerHTML = "";
  get();
  setTimeout(renderStatus , 2000);
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
  // console.log(response[0].message);
  statusBar.innerHTML = response.message
  notesBox.innerHTML = "";
  get();
  setTimeout(renderStatus , 2000);
}

addBtn.addEventListener("click", () => {
  add();
});

async function lastUpdated(){

}


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
    addBtn.classList.add('d-none');
    editInput.value = e.target.textContent;
    let oldValue = e.target.textContent;
    saveBtn.onclick = async () => {
      let newValue = editInput.value;
      await updateData(oldValue, newValue)
      editInput.classList.add('d-none');
      addBtn.classList.remove('d-none');
      closeBtn.classList.add('d-none');
      saveBtn.classList.add('d-none');
    }
  }
  else if (e.target.classList.contains('delete-button')) {
    // let confirmData = confirm("Confirm delete?")
    // if(confirmData === true){
      confirmDelete.classList.remove('d-none');
      yesBtn.onclick= () =>{
        deleteData(e.target.parentElement.dataset.id)
        confirmDelete.classList.add('d-none');
      }
      noBtn.onclick= () =>{
        confirmDelete.classList.add('d-none');
      }
      
    
  }
  else if (e.target.classList.contains('fa-trash')) {

    confirmDelete.classList.remove('d-none');
      yesBtn.onclick= () =>{
        deleteData(e.target.parentElement.parentElement.dataset.id)
        confirmDelete.classList.add('d-none');
      }
      noBtn.onclick= () =>{
        confirmDelete.classList.add('d-none');
      }
    
  
  }
})


searchBtn.addEventListener('click', ()=>{

  let searchNumber=0;
  console.log(searchInput.value);
  searchResult.innerHTML="";
  // const listNote = document.querySelectorAll(".list-note");
  const listNoteText = document.querySelectorAll(".list-note p");
  for(let j=0;j<listNoteText.length;j++){
      if((listNoteText[j].innerHTML.toLowerCase()).includes(searchInput.value.toLowerCase())){
        let resultFound = document.createElement('a');
        let setId = "#index"+j;
        resultFound.setAttribute('href' , setId )
        resultFound.classList.add('result-found');
        // resultFound.addAttribute('data-bs-toggle','offcanvas')
       
        resultFound.innerHTML = listNoteText[j].innerHTML;
        console.log(listNoteText[j].innerHTML);
        searchResult.appendChild(resultFound);
        searchNumber++;

      }
  }

  searchResult.querySelectorAll('a').forEach(element => {
    element.onclick = () =>{
    offcanvasRight.classList.remove('show');
    searchInput.value="";
    searchResult.innerHTML="";
}});
  
  if(searchNumber === 0){
    searchResult.innerHTML = "No such note found!";
  }

})


function renderStatus(){
  statusBar.innerHTML = "Hey there, add a note."
  let opacity = 0;
      function fade() {
         if (opacity >= 1) {
            return;
         }
         opacity += 0.01;
         statusBar.style.opacity = opacity;
         requestAnimationFrame(fade);
      }
      requestAnimationFrame(fade);
}


// <<<< to be done grid and list view >>>>>>

// function viewNotes(){
// let viewValue =viewSelect.options[viewSelect.selectedIndex];
// if(viewValue.classList.contains('view-list'))
// console.log("list1");
// else if (viewValue.classList.contains('view-grid'))
// console.log("grid");
// }
// viewNotes();
// console.log(viewList );
// viewList.addEventListener('click',()=>{
//   console.log("5");
// })
// viewGrid.addEventListener('click',()=>{
//   console.log(2);
// })

// <<<< to be done grid and list view >>>>>>