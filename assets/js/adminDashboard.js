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
const icons = document.querySelectorAll(".anchor");
console.log(icons);
console.log(toggle);
let table = document.querySelector("#myChart");
let table2 = document.querySelector("#myChart2");
let table3 = document.querySelector("#myChart3");
let sideNav = document.querySelector(".side-nav");
const body = document.querySelector("body");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("bi-moon-fill");
  if (toggle.classList.toggle("bi-brightness-high-fill")) {
    body.style.background = "white";
    sideNav.style.border = "1px solid white";
    sideNav.style.borderColor = "white";
    body.style.color = "black";
    body.style.transition = "2s";
    icons.forEach((i) => {
      i.style.color = "black";
    });
  } else {
    body.style.background = "black";
    body.style.color = "white";
    body.style.transition = "2s";
    table.style.background = "white";
    table2.style.background = "white";
    sideNav.style.border = "1px solid white";
    icons.forEach((i) => {
      i.style.color = "white";
    });
    table3.style.background = "white";
  }
});

//
const USERS_URL = "http://localhost:3000/users";
let userCount = document.querySelector(".user-count");
let containCount = [];

async function countInner() {
  let res = await axios(`${USERS_URL}`);
  let data = await res.data;
  containCount = data.filter((obj) => obj.isAdmin === false);
  console.log(containCount.length);
  userCount.innerHTML = containCount.length;
}
countInner();

const PRODUCT_URL = "http://localhost:3000/products";
let userCount2 = document.querySelector(".user-count2");
let containCount2 = [];

async function countInner2() {
  let res = await axios(`${PRODUCT_URL}`);
  let data = await res.data;
  containCount2 = data;
  userCount2.innerHTML = containCount2.length;
}
countInner2();
const KID_URL = "http://localhost:3000/kids";
let userCount3 = document.querySelector(".user-count3");
let containCount3 = [];

async function countInner3() {
  let res = await axios(`${KID_URL}`);
  let data = await res.data;
  containCount3 = data;
  userCount3.innerHTML = containCount3.length;
}
countInner3();

const MESSAGE_URL = "http://localhost:3000/message";
let userCount4 = document.querySelector(".user-count4");
let containCount4 = [];

async function countInner4() {
  let res = await axios(`${MESSAGE_URL}`);
  let data = await res.data;
  containCount4 = data;
  userCount4.innerHTML = containCount4.length;
}
countInner4();

let tBody = document.querySelector("tbody");
async function fillTable() {
  let res = await axios(`${USERS_URL}`);
  let data = await res.data;
  containCount = data.filter((obj) => obj.isAdmin === true);
  containCount.forEach((obj) => {
    tBody.innerHTML += `
    <tr>
              <th scope="row">${obj.id}</th>
              <td>${obj.userName}</td>
              <td>${obj.email}</td>
              <td><button class="btn btn-danger" onclick=deleteAdmin(${obj.id})>Delete admin</button></td>
            </tr>
    `;
  });
}
fillTable();
//
async function deleteAdmin(id) {
  axios.patch(`${USERS_URL}/${id}`, { isAdmin: false });
}
