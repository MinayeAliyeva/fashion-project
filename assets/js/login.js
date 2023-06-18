let form = document.querySelector("form");
let allInputs = document.querySelectorAll(".form-control");
const USERS_URL = "http://localhost:3000/users";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let res = await axios(USERS_URL);
  let data = await res.data;
  if (
    data.find(
      (obj) =>
        obj.userName == allInputs[0].value && obj.password == allInputs[1].value
    )
  ) {
    window.location = "home.html";
  } else {
    alert("such user is not exisist");
  }
});

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   let res = await axios(USERS_URL);
//   let data = await res.data;
//   let admin = data.filter((obj) => {
//     if (
//       obj.isAdmin === "true" &&
//       obj.userName == allInputs[0].value &&
//       obj.password == allInputs[1].value
//     ) {
//       window.location = "adminDashboard.html";
//     } else if (
//       obj.isAdmin === "false" &&
//       obj.userName == allInputs[0].value &&
//       obj.password == allInputs[1].value
//     ) {
//       window.location = "home.html";
//     } else {
//       alert("Such user are not exists!!!");
//     }
//   });
// });
