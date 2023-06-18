let form = document.querySelector("form");
let allInputs = document.querySelectorAll(".form-control");
let imgInput = document.querySelector("#imgInput");
const USERS_URL = "http://localhost:3000/users";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("isSign", JSON.stringify(true));
  let userObj = {
    userName: allInputs[0].value,
    lastName: allInputs[1].value,
    email: allInputs[2].value,
    password: allInputs[3].value,
    img: base64,
    isAdmin: false,
  };
  localStorage.setItem("signName", userObj.userName);
  axios.post(`${USERS_URL}`, userObj);
  window.location = "login.html";
});
//
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
imgInput.addEventListener("change", (e) => {
  uploadImg(e);
});

//menubar
let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});



form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let res = await axios(`${USERS_URL}`);
  allUsers = res.data;
 let admin= allInputs.forEach((obj) => {
    return obj.userName === allInputs[0].value;
  });
  if (admin) {
    console.log("ok");
  }
});
