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
signUpForm.addEventListener("submit", (e) => {
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
    } else {
      alert("such user is not defaind");
    }
  });
});

//products
const PRODUCTS_URL = "http://localhost:3000/products";
let arrCopy = [];
let filteredData = [];
let num = 4;
let mainRow2 = document.querySelector(".mainRow2");
async function fillProducts() {
  let res = await axios(PRODUCTS_URL);
  let data = await res.data;
  arrCopy = data;
  filteredData = filteredData.length
    ? filteredData.slice(0, num)
    : data.slice(0, num);
  mainRow2.innerHTML = "";
  filteredData.forEach((obj) => {
    mainRow2.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-12">
    <div class="card">
      <img
        src="${obj.img}"
        alt=""
      />
      <div class="actions">
        <i class="fa-regular fa-heart"></i>
        <i class="fa-solid fa-eye"></i>
      </div>
      <div class="actions2">add basket</div>
      <div class="text-side">
        <h5>${obj.productName}</h5>
        <i><span> ${obj.productprice} TL</span></i>
      </div>
    </div>
  </div>
`;
  });
}
fillProducts();
