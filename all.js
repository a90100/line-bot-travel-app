//介面
const addBtn = document.getElementsByClassName("addBtn");
const addForm = document.getElementById("addForm");
const addList = document.getElementById("addList");
//表單
const title = document.getElementById("title");
const goTravel = document.getElementById("goTravel");
const travelTime = document.getElementById("travelTime");
const goHome = document.getElementById("goHome");
const homeTime = document.getElementById("homeTime");
const note = document.getElementById("note");
const sureAdd = document.getElementById("sureAdd");
const sureEdit = document.getElementById("sureEdit");
//列表按鈕
const editThing = document.getElementsByClassName("editThing");
const deleteThing = document.getElementsByClassName("deleteThing");

let temp = 0;
let things = JSON.parse(localStorage.getItem('things')) || [];
console.log(things);
let thingsPos = 0;
updateList();

addBtn[0].addEventListener('click', openCloseForm);
addBtn[1].addEventListener('click', openCloseForm);
sureAdd.addEventListener('click', addToList);
sureEdit.addEventListener('click', editToList);
//開關表單
function openCloseForm(e) {
  //顯示新增表單
  if (temp == 0) {
    temp++;
    addForm.removeAttribute('class', 'removeForm');
    addList.setAttribute('class', 'removeList');
    sureEdit.style.display = "none";
    sureAdd.style.display = "inline";
  } //顯示列表
  else {
    e.preventDefault();
    addForm.setAttribute('class', 'removeForm');
    addList.removeAttribute('class', 'removeList');
    temp = 0;
  }
}
//更新行程列表
function updateList() {
  let length = things.length;
  let insertHTML = '';
  for (let i = 0; i < things.length; i++) {
    insertHTML += `
	  <li>
    <div class = "title">
    <button class="editThing">
    <i class = "fas fa-edit"></i> 
    </button>
    <h3> ${things[i].title} </h3>
    <button class="deleteThing">
    <i class = "fas fa-trash-alt"></i>
    </button>
    </div> 
    <p>
    ${things[i].goTravel} ${things[i].travelTime} ~ ${things[i].goHome} ${things[i].homeTime}
    </p>
    <p id="getNote">
    ${things[i].note}
    </p>
    </li>`
    addList.innerHTML = insertHTML;
  }

  for (let j = 0; j < length; j++) {
    deleteThing[j].addEventListener('click', function () {
      thingsPos = j;
      deleteToThing();
    });
  }
  for (let i = 0; i < things.length; i++) {
    editThing[i].addEventListener('click', function () {
      thingsPos = i;
      editToThing();
    });
  }
  localStorage.setItem('things', JSON.stringify(things));
}
//增加行程事項
function addToList(e) {
  e.preventDefault();
  let newThing = {};
  newThing.title = title.value;
  newThing.goTravel = goTravel.value;
  newThing.travelTime = travelTime.value;
  newThing.goHome = goHome.value;
  newThing.homeTime = homeTime.value;
  newThing.note = note.value;

  things.push(newThing);
  updateList();
  openCloseForm(e);

  title.value = '';
  goTravel.value = '';
  travelTime.value = '';
  goHome.value = '';
  homeTime.value = '';
  note.value = '';
}
//編輯後加入行程
function editToList(e) {
  e.preventDefault();
  let newThing = {};

  newThing.title = title.value;
  newThing.goTravel = goTravel.value;
  newThing.travelTime = travelTime.value;
  newThing.goHome = goHome.value;
  newThing.homeTime = homeTime.value;
  newThing.note = note.value;
  title.value = '';
  things.splice(thingsPos, 1, newThing);
  updateList();
  openCloseForm(e);
}
//編輯行程事項
function editToThing() {
  openCloseForm();
  //轉換成編輯按鈕
  sureEdit.style.display = "inline";
  sureAdd.style.display = "none";
  //取得點擊li的資料
  title.value = things[thingsPos].title;
  goTravel.value = things[thingsPos].goTravel;
  travelTime.value = things[thingsPos].travelTime;
  goHome.value = things[thingsPos].goHome;
  homeTime.value = things[thingsPos].homeTime;
  note.value = things[thingsPos].note;
}
//刪除行程事項
function deleteToThing() {
  things.splice(thingsPos, 1);
  if (things.length == 0) {
    addList.removeChild(addList.children[0]);
    localStorage.removeItem("things");
  } else {
    updateList();
  }
}