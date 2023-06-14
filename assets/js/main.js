let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});

const USERS_URL = "http://localhost:3000/users";
let signUpForm = document.querySelector(".signUpForm");
let nameInput = document.querySelector(".nameInput");
let emailInput = document.querySelector(".emailInput");
let passwordInput = document.querySelector(".passwordInput");
let passwordInput2 = document.querySelector(".passwordInput2");

//products
const PRODUCTS_URL = "http://localhost:3000/products";
let arrCopy = [];
let filteredData = [];
let num = 7;
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
    <div class="col-lg-3 col-md-4 col-sm-12 products-title">
    <div class="card ">
      <img
        src="${obj.img}"
        alt=""
      />
      <div class="actions">
        <i class="fa-regular fa-heart" onclick=addFav(${obj.id})></i>
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

let signinUsers = JSON.parse(localStorage.getItem("isSign"));

async function addFav(id) {
  let res = await axios(`${PRODUCTS_URL}/${id}`);
  let data = await res.data;
  if (signinUsers == true) {
    console.log("addFav");
  }else{
    console.log(" go sign in");
  }
}
//new trending outfits
const NEW_TRENDINGS = "http://localhost:3000/newtrending-products";
let arrCopy2 = [];
let filteredData2 = [];
let num2 = 7;
let mainRow3 = document.querySelector(".mainRow3");
async function fillProducts2() {
  let res = await axios(NEW_TRENDINGS);
  let data = await res.data;
  arrCopy2 = data;
  filteredData2 = filteredData2.length
    ? filteredData2.slice(0, num)
    : data.slice(0, num);
  mainRow3.innerHTML = "";
  filteredData2.forEach((obj) => {
    mainRow3.innerHTML += `
     <div class="col-lg-3 col-md-4 col-sm-12">
    <div class="card">
      <img
        src="${obj.img}"
        alt=""
      />
      <div class="content">
        <div class="text">
      <div> <div class="actions">
       <i class="fa-solid fa-heart" onclick=addFav(${obj.id},this)></i>
        <i class="fa-solid fa-eye"></i>
      </div>
      <div class="actions2">add basket</div></div>
          <div class="text-side">
            <h5 >${obj.productName}</h5>
            <i><span> ${obj.productprice}</span></i>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
  });
}
fillProducts2();

//video
let videoPlayer = document.querySelector("#videoPlayer");
let myVideo = document.querySelector("#myVideo");
function stopVideo() {
  videoPlayer.style.display = "none";
}
function playVideo(file) {
  myVideo.scr = file;
  videoPlayer.style.display = "block";
}
//
// let heading = document.querySelector(".header h2");
// let anchors = document.querySelectorAll(".navUl a");
// let drops = document.querySelectorAll(".dropdown button");
// console.log(drops);
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
    heading.style.color = "white";
  }
});
//accardion
const accardionContent = document.querySelectorAll(".accardion-content");
accardionContent.forEach((item, index) => {
  let header1 = item.querySelector(".header1");
  header1.addEventListener("click", () => {
    item.classList.toggle("open");
    let description = item.querySelector(".description");
    console.log(item);
    console.log(description.scrollHeight);
    console.log(description);
    if (item.classList.contains("open")) {
      description.style.height = `${description.scrollHeight}px`;
      item.querySelector("i").classList.replace("fa-plus", "fa-minus");
      console.log("hh");
    } else {
      description.style.height = "0px";
      item.querySelector("i").classList.replace("fa-minus", "fa-plus");
      console.log("nn");
    }
    removeOpen(index);
  });
});

function removeOpen(index1) {
  accardionContent.forEach((item2, index2) => {
    if (index1 != index2) {
      item2.classList.remove("open");
      let des = item2.querySelector(".description");
      des.style.height = "0px";
      item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
  });
}
//
let toTop = document.getElementById("toTop");
toTop.style.display = "none";
window.addEventListener("scroll", () => {
  if (this.scrollY > 110) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//spinner
let loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});

//fav
