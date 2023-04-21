let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

const Editor = toastui.Editor;

const editor = new Editor({
  el: document.querySelector("#editor"),
  height: "600px",
  initialEditType: "markdown",
  previewStyle: "vertical",
});

render(); // render 가 있어야 새로고침 시 저장 내용들이 불러와져있음

function saveNote() {
  const title = document.getElementById("title").value;
  const content = editor.getHTML();

  if (true) { // 에디터 안에 내용이 비어있으면 등록 X 기능
    allMemo.push({ title, content, len: allMemo.length });

    localStorage.setItem("allMemo", JSON.stringify(allMemo));
  }
  render();
}

function render(){
  const display = document.getElementById("display");
  const editor = document.querySelector('.ProseMirror').querySelector('div');
  const title = document.querySelector('#title');
  display.innerHTML = "";

  for (const item of allMemo){
    const wrapDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("div");
    const saveDate = document.createElement("span");
    const deleteMemoBtn = document.createElement("button");

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();

    contentDiv.classList.add('contentDiv')
    saveTitle.textContent = item.title;
    saveContent.innerHTML = item.content;
    saveDate.textContent = `${year}년 ${month}월 ${date}일`;
    deleteMemoBtn.textContent = "삭제";
    deleteMemoBtn.classList.add('btn');
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");

    display.appendChild(wrapDiv);
    wrapDiv.appendChild(contentDiv);
    contentDiv.appendChild(saveTitle);
    contentDiv.appendChild(saveDate);
    contentDiv.appendChild(saveContent);
    wrapDiv.appendChild(deleteMemoBtn);
  }
  editor.innerHTML = "";
  title.value = "";
}

function remove(){
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(allMemo.findIndex((item) => item.len == idx.len), 1);
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}

const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  alert('제목과 본문을 삭제합니다.')

  const editor = document.querySelector('.ProseMirror').querySelector('div');
  const title = document.querySelector('#title');

  editor.innerHTML = ""
  title.value = ""
})

// 날짜
const $year = document.querySelector('.year');
const $month = document.querySelector('.month');
const $date = document.querySelector('.date');

let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
let date = new Date().getDate();

$year.textContent = `${year}년`;
$month.textContent = `${month}월`;
$date.textContent = `${date}일`;


// 날씨
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "a6b736388f27635d259edc2d80c58d4b"

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url) // js가 url 주소를 불러줌
    .then((Response) => Response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); // 위치 좌표