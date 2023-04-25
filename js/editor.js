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
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();
  
  if (!title || content === '<p><br></p>') {
    alert('제목과 내용을 입력해주세요');
  } else {
    allMemo.push({ title, content, len: allMemo.length, year, month, date });
    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
  }
}

function reset(){
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

    contentDiv.classList.add('contentDiv')
    saveTitle.textContent = item.title;
    saveContent.innerHTML = item.content;
    saveDate.textContent = `${item.year}년 ${item.month}월 ${item.date}일`;
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