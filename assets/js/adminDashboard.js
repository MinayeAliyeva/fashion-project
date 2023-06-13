const xValues = [
  "January",
  "Fabruary",
  "Marth",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novomber",
  "December",
];
const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15, 60];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "red",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 6, max: 20 } }],
    },
  },
});

//
var xValues2 = ["Dress", "Shoses", "Make up", "Men", "Kids"];
var yValues2 = [90, 49, 84, 94, 75];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("myChart2", {
  type: "doughnut",
  data: {
    labels: xValues2,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues2,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Catagories",
    },
  },
});
var xValues3 = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues3 = [55, 49, 44, 24, 15];
var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

new Chart("myChart3", {
  type: "pie",
  data: {
    labels: xValues3,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues3,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Which countries works us",
    },
  },
});
//light mood
const toggle = document.querySelector("#toogleDark");
const icons=document.querySelectorAll('.anchor')
console.log(icons);
console.log(toggle);
let table=document.querySelector("#myChart")
let table2=document.querySelector("#myChart2")
let table3=document.querySelector("#myChart3")
const body = document.querySelector("body");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("bi-moon-fill");
  if (toggle.classList.toggle("bi-brightness-high-fill")) {
    body.style.background = "white";
    body.style.color = "black";
    body.style.transition = "2s";
    icons.forEach((i)=>{
      i.style.color="black"
    })
  } else {
    body.style.background = "black";
    body.style.color = "white";
    body.style.transition = "2s";
    table.style.background='white'
    table2.style.background='white'
    icons.forEach((i)=>{
      i.style.color="white"
    })
    table3.style.background='white'
  }
});
