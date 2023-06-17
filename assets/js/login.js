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
