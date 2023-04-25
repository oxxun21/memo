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