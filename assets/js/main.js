let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector(".menu");
console.log(nav);
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});

//
const USERS_URL = "http://localhost:3000/users";
// let form = document.querySelector(".signUpForm");
let signUpForm = document.querySelector(".signUpForm");
let nameInput = document.querySelector(".nameInput");
let emailInput = document.querySelector(".emailInput");
let passwordInput = document.querySelector(".passwordInput");
let passwordInput2 = document.querySelector(".passwordInput2");

//signInform
signUpForm.addEventListener("submit",  (e) => {
  e.preventDefault();
  let obj1 = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    isSignin: true,
  };
  axios.get(USERS_URL).then((res) => {
     data = res.data;
    data.find((obj) => {
      if (
        nameInput.value == obj.name &&
        emailInput.value == obj.email &&
        passwordInput.value == obj.password
      ) {
        alert("Such accaund has exists");
      } else {
        axios.post(`${USERS_URL}`, obj1);
      }
    });
  });
});
//loginForm
let loginForm = document.querySelector(".loginForm");
let emailLogin = document.querySelector(".emailLogin");
let passwordLogin = document.querySelector(".passwordLogin");
loginForm.addEventListener("click", (e) => {
  e.preventDefault();
  axios.get(USERS_URL).then((res) => {
    data = res.data;
    if (
      data.find(
        (obj) =>
          obj.email == emailLogin.value && obj.password == passwordLogin.value
      )
    ) {
      localStorage.setItem("isUserLogin", true);
    }
    else{
      alert("such user is not defaind")
    }
  });
});
