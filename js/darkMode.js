// 다크 모드
function darkMode(){
  let body = document.body;
  body.classList.toggle('darkMode');
  const editor = document.querySelector('.ProseMirror');
  const title = document.querySelector('#title');
  const popupBody = document.querySelector('.toastui-editor-popup-body');

  if (body.classList.contains('darkMode')){
    editor.style.color = '#fff';
    title.style.background = 'rgb(65, 65, 65)';
    title.style.color = '#fff';
    popupBody.style.color = 'black';
  } else {
    editor.style.color = 'black';
    title.style.background = '#f3f3f3';
    title.style.color = 'black';
  }
}