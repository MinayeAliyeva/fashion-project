let form = document.querySelector("#form");
let userName = document.querySelector("#username");
let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");
const BASE_URL = "http://localhost:3000/admin";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  validateInputs();
  let res = await axios(BASE_URL);
  let data = await res.data;
  data.forEach((obj) => {
    if (obj.userName == userName.value && obj.password == password.value) {
      window.location = "adminDashboard.html";
    }
  });
});
const setError = (el, mes) => {
  const inputControl = el.parentElement;
  const errDisplay = inputControl.querySelector(".error");
  errDisplay.innerText = mes;
  inputControl.classList.add(".error");
  inputControl.classList.remove(".success");
};
const setSuccess = (el) => {
  const inputControl = el.parentElement;
  const errDisplay = inputControl.querySelector(".error");
  errDisplay.innerText = "";
  inputControl.classList.add(".success");
  inputControl.classList.remove(".error");
};

const validateInputs = () => {
  const userNameValue = userName.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  if (userNameValue === "") {
    setError(userName, "Username is required");
  } else {
    setSuccess(userName);
  }
  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.lenght < 8) {
    setError(password, "Password must be at least 8 character.");
  } else {
    setSuccess(password);
  }
  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Paswords doesn't match ");
  } else {
    setSuccess(password2);
  }
};
