let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

const Editor = toastui.Editor;

const editor = new Editor({
  el: document.querySelector("#editor"),
  height: "450px",
  initialEditType: "markdown",
  previewStyle: "vertical",
  hideModeSwitch: "true",   // wysiwyg, markdown 변경 버튼 숨김
  placeholder: "내용을 입력해주세요.",
});

render(); // render 가 있어야 새로고침 시 저장 내용들이 불러와져있음

function saveNote() {
  const title = document.getElementById("title").value;
  const content = editor.getHTML();

  if (title === "" && content === "") { // 에디터 안에 내용이 비어있으면 등록 X 기능 => 왜 안대지?
    alert('제목과 내용을 입력해주세요');
  } else {
    allMemo.push({ title, content, len: allMemo.length });
    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
  }
}

function reset(){ // wysiwyg 에서는 왜 안될까
  const title = document.querySelector('#title');
  const editor = document.querySelector('.ProseMirror');

  title.value = ""
  while(editor.hasChildNodes()){
    editor.removeChild(editor.firstChild);
  }
}

function render(){
  const display = document.getElementById("display");
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
    saveContent.innerHTML = item.content;   // 마크다운 요소가 하나도 적용이 안되는데?
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
  reset();
}

function remove(){
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(allMemo.findIndex((item) => item.len == idx.len), 1);
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}

function resetConfirm(){
  if(confirm('초기화 하시겠습니까?')){
    reset();
  }
}

// 글 수정

// 다크 모드
function darkMode(){  // 상태 유지를 시켜야핳까?
  let body = document.body;
  body.classList.toggle('darkMode');
  const editor = document.querySelector('.ProseMirror');
  // const viewer = document.querySelector('.toastui-editor-contents').childNodes 뷰어 색은 왜 안바뀜
  const title = document.querySelector('#title');
  const toolBar = document.querySelector('.toastui-editor-defaultUI-toolbar');

  if (body.classList.contains('darkMode')){
    editor.style.color = '#fff';
    title.style.background = '#999';
    title.style.color = '#fff';
    toolBar.style.background = '#999';
    // toolBar border, toggle btn, viewer 색상 다 이렇게 바꾸는게 맞나;;
  } else {
    editor.style.color = 'black';
    title.style.background = '#f3f3f3';
    title.style.color = 'black';
    toolBar.style.background = '#f7f9fc';
  }
}

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