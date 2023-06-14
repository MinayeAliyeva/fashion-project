let form = document.querySelector("form");
let allInputs = document.querySelectorAll(".form-control");
const USERS_URL = "http://localhost:3000/users";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("isSign", JSON.stringify(true));
  let userObj = {
    userName: allInputs[0].value,
    lastName: allInputs[1].value,
    email: allInputs[2].value,
    password: allInputs[3].value,
  };
  axios.post(`${USERS_URL}`, userObj);
  window.location = "home.html";
});
