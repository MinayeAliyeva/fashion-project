let sendMes = document.querySelector(".sendMes");
let form = document.querySelector("form");
let fullName = document.querySelector(".fullName");
let email = document.querySelector(".email");
let message = document.querySelector(".message");
const MES_URL = "http://localhost:3000/message";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    fullName: fullName.value,
    email: email.value,
    message: message.value,
  };
  fullName.value = "";
  email.value = "";
  message.value = "";
  axios.post(`${MES_URL}`, obj);
});
//
const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");
if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}
const toastContaainer = document.querySelector(".toast-container");
toastContaainer.style.top="60px"
//menubar
let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});