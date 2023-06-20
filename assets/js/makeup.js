//header
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.background = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
});
//spinner
let loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});

/// carusel

let swiper = new Swiper(".mySwiper", {
  autoHeight: true,
  effect: "coverflow",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 40,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
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

//products
const MAKEUP_URL = "http://localhost:3000/makeUp";
let arrCopy = [];
let filteredData = [];
let num = 4;
let mainRrow = document.querySelector(".mainRrow");

async function fillProducts() {
  let res = await axios(MAKEUP_URL);
  let data = await res.data;
  arrCopy = data;
  filteredData = filteredData.length
    ? filteredData.slice(0, num)
    : data.slice(0, num);
  mainRrow.innerHTML = "";
  filteredData.forEach((obj) => {
    mainRrow.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-12 products-title d-flex align-items-center justify-content-center">
    <div class="card " >
      <img
        src="${obj.img}"
        alt=""
      />
      <div style="      display: flex;
      align-items: center;
      row-gap: 20px;
      column-gap: 20px;
      position: absolute;
      flex-direction: column;
      padding: 16px 24px;" class="actions">
        <i class="fa-regular fa-heart" onclick=addFav(${obj.id})></i>
 <i   class="fa-solid fa-eye"  onclick=details(${obj.id})></i>
     <i style="    font-size: 17px;"  onclick=addBasket(${obj.id}) class="fa-solid fa-bag-shopping"></i>

      </div>
     
      <div style="
      padding: 4px 18px;
  " class="text-side">
        <h5 style="text-transform: uppercase;
        font-size: 16px;
        font-weight: 400;">${obj.productName}</h5>
        <i><span style="    font-size: 14px;"> ${obj.productprice} TL</span></i>
      </div>
    </div>
  </div>
`;
  });
}
fillProducts();

//add fav
let profile = document.querySelector(".profile");
const FAV_URL = "http://localhost:3000/favorites";
let signinUsers = JSON.parse(localStorage.getItem("isSign"));
profile.display = "none";

window.addEventListener("load", async () => {
  const SIGN_USERS = "http://localhost:3000/users";
  let res = await axios(`${SIGN_USERS}`);
  let data = await res.data;
  let signName = localStorage.getItem("signName");
  data.filter((obj) => {
    if (obj.userName == signName && signinUsers) {
      profile.innerHTML = `
  <div class="d-flex align-items-center column-gap-2">
                <img src="${obj.img}" alt="" />
                <div
                  class="d-flex column-gap-2 align-items-center flex-column"
                >
                  <p>${obj.userName}</p>
                  <i class="fa-solid fa-arrow-right-from-bracket" onclick=logProfile()></i>
                </div>
              </div> `;
      profile.style.display = "block";
    } else {
      profile.style.display = "none";
    }
  });
});
function logProfile() {
  localStorage.clear("signinUsers");
  localStorage.clear("signName");
}
async function addFav(id) {
  let res = await axios(`${MAKEUP_URL}/${id}`);
  let obj = await res.data;
  if (signinUsers == true) {
    axios.post(`${FAV_URL}`, obj);
    window.location = "favorites.html";
  } else {
    window.location = "signin.html";
  }
}

//cart
const CARD_URL = "http://localhost:3000/card";
async function addBasket(id) {
  if (signinUsers) {
    let res = await axios(`${MAKEUP_URL}/${id}`);
    let obj = await res.data;
    await axios.post(`${CARD_URL}`, obj);
    console.log(id);
    addBasket2();
  } else {
    window.location = "signin.html";
  }
}

let card = document.querySelector(".cart");
let close = document.querySelector("#close");
let cardIcon = document.querySelector("#cardIcon");
cardIcon.addEventListener("click", () => {
  card.classList.toggle("active");
});
close.addEventListener("click", () => {
  card.classList.remove("active");
});
let cardRow = document.querySelector(".card-row");
//counter
let counter = document.querySelector(".counter");
let totalInner = document.querySelector(".total-price");
let count = [];
let priceCount=[]
let totalPrice;
async function addBasket2() {
  let res = await axios(`${CARD_URL}`);
  let data = await res.data;
  count = data;
  priceCount=data
  let totalInner = document.querySelector(".total-price");
  let totalChild = data.reduce((accum, item) => accum + +item.productprice, 0);
  totalInner.innerHTML = totalChild;
  counter.innerHTML = count.length;
  cardRow.innerHTML = "";
  data.forEach((obj) => {
    cardRow.innerHTML += `
    <div class="cart-content">
              <div class="cart-box">
                <img
                  src="${obj.img}"
                  alt=""
                />
                <div class="details-box">
                  <div class="card-product-title">${obj.productName}</div>
                  <div class="card-price">${obj.productprice}$</div>
                  <input type="number" style="width: 30px;" value="1" oninput=onInput(${obj.productprice},this) class="cart-quantity"/>
                </div>
                <i class="fa-solid fa-trash-can" onclick=delFun(${obj.id})></i>
              </div>
            </div>
        
    `;
  });
}
//total
addBasket2();

// oninput
function onInput(price,input){
  let totalChild = priceCount.reduce((accum, item) => accum*input.value  + +item.productprice, 0);
  totalInner.innerHTML=totalChild
  console.log(totalChild)
  
}

//delete cart
async function delFun(id, btn) {
  await axios.delete(`${CARD_URL}/${id}`);
  addBasket2();
}

