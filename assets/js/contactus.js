let sendMes = document.querySelector(".sendMes");
let form = document.querySelector("form");
let fullName = document.querySelector(".fullName");
let email = document.querySelector(".email");
let message = document.querySelector(".message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    fullName: fullName.value,
    email: email.value,
    message: message.value,
  };
  console.log(obj);
  fullName.value = "";
  email.value = "";
  message.value = "";
});
