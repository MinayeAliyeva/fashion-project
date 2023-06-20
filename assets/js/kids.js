let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
console.log(nav);
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
//header
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.background = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
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
//products
const KIDS_URL = "http://localhost:3000/kids";
let arrCopy = [];
let filteredData = [];
let num = 4;
let mainRow8 = document.querySelector(".mainRow8");
async function fillProducts() {
  let res = await axios(KIDS_URL);
  let data = await res.data;
  arrCopy = data;
  filteredData = filteredData.length
    ? filteredData.slice(0, num)
    : data.slice(0, num);
  mainRow8.innerHTML = "";
  filteredData.forEach((obj) => {
    mainRow8.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-12 products-title">
    <div class="card ">
      <img
        src="${obj.img}"
        alt=""
      />
      <div class="actions">
        <i class="fa-regular fa-heart" onclick=addFav(${obj.id})></i>
 <i type="button"  data-bs-toggle="modal"
     data-bs-target="#exampleModal" class="fa-solid fa-eye" onclick=details(${obj.id})></i>
     <i type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick=details(${obj.id})  style="    font-size: 17px;"  onclick=addBasket(${obj.id}) class="fa-solid fa-bag-shopping"></i>

      </div>
     
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
  let res = await axios(`${KIDS_URL}/${id}`);
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
    let res = await axios(`${KIDS_URL}/${id}`);
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
let priceCount = [];
let totalPrice;
async function addBasket2() {
  let res = await axios(`${CARD_URL}`);
  let data = await res.data;
  count = data;
  priceCount = data;
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
function onInput(price, input) {
  let totalChild = priceCount.reduce(
    (accum, item) => accum * input.value + +item.productprice,
    0
  );
  totalInner.innerHTML = totalChild;
  console.log(totalChild);
}

//delete cart
async function delFun(id, btn) {
  await axios.delete(`${CARD_URL}/${id}`);
  addBasket2();
}
//details
let modalDialog = document.querySelector(".modal-dialog");
async function details(id) {
  let res = await axios(`${KIDS_URL}/${id}`);
  let obj = await res.data;
  modalDialog.innerHTML = `
    <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div style="border: none" class="card">
                        <img
                          style="width: 100%; height: 400px; object-fit: cover"
                          src="${obj.img}"
                          alt=""
                        />
    
                        <div
                          class="text-side"
                          style="
                            display: flex;
                            flex-direction: column;
                            padding: 10px;
                          "
                        >
                          <h5 style="font-size: 17px; font-weight: 300">
                            Product Name:${obj.productName}
                          </h5>
                          <i
                            ><span><i>Price</i> : $ ${obj.productprice} TL</span></i
                          >
                          <span><i>Bush type</i> :Standard Goal</span>
                          <span
                            ><i>Material component</i> :52% polyesyer ,48%
                            elastommultiester</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
    `;
}