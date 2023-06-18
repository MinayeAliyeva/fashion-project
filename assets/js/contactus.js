let sendMes = document.querySelector(".sendMes");
let form = document.querySelector("form");
let fullName = document.querySelector(".fullName");
let email = document.querySelector(".email");
let message = document.querySelector(".message");
let imgInputC = document.querySelector(".imgInputC");
const MES_URL = "http://localhost:3000/message";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    fullName: fullName.value,
    email: email.value,
    message: message.value,
    img: base64,
  };
  console.log(obj);
  fullName.value = "";
  email.value = "";
  message.value = "";
  axios.post(`${MES_URL}`, obj);
});

let base64;
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const uploadImg = async (e) => {
  const file = e.target.files[0];
  base64 = await convertBase64(file);
};
imgInputC.addEventListener("change", (e) => {
  uploadImg(e);
});

//header
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.background = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
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
toastContaainer.style.top = "60px";
//menubar
let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});
//spinner
let loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});