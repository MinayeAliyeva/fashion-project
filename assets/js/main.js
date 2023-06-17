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
    <div class="col-lg-3 col-md-4 col-sm-12 products-title">
    <div class="card ">
      <img
        src="${obj.img}"
        alt=""
      />
      <div class="actions">
        <i class="fa-regular fa-heart" onclick=addFav(${obj.id})></i>
 <i  data-bs-toggle="modal"
     data-bs-target="#exampleModal" class="fa-solid fa-eye" onclick=details(${obj.id})></i>
     <i style="    font-size: 17px;"  onclick=addBasket(${obj.id}) class="fa-solid fa-bag-shopping"></i>

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
//search product
let searchProduct = document.querySelector(".searchProduct");
searchProduct.addEventListener("input", (e) => {
  filteredData = arrCopy
    .filter((obj) => {
      return obj.productName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    })
    .slice(0, num);
  fillProducts();
});
//sort
let select = document.querySelector("#select");
select.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value == "from low to high") {
    filteredData = filteredData.sort((a, b) => a.productprice - b.productprice);
    fillProducts();
  } else if (e.target.value == "from high to low") {
    filteredData = filteredData.sort((a, b) => b.productprice - a.productprice);
    fillProducts();
  } else {
    filteredData = arrCopy;
    fillProducts();
  }
});

//loadmore
let loadMore = document.querySelector(".loadMore");
console.log(loadMore);
loadMore.addEventListener("click", (e) => {
  num += 3;
  filteredData = arrCopy
    .filter((obj) => {
      return obj.productName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    })
    .slice(0, num);
  fillProducts();
});
//add fav
let profile = document.querySelector(".profile");
const FAV_URL = "http://localhost:3000/favorites";
let signinUsers = JSON.parse(localStorage.getItem("isSign"));
let logProfile = document.querySelector(".fa-arrow-right-from-bracket");
logProfile.addEventListener("click", () => {
  localStorage.clear("signinUsers");
  console.log("o");
});
profile.display = "none";
window.addEventListener("load", () => {
  if (signinUsers) {
    profile.style.display = "block";
  } else {
    profile.style.display = "none";
  }
});

async function addFav(id) {
  let res = await axios(`${PRODUCTS_URL}/${id}`);
  let obj = await res.data;
  if (signinUsers == true) {
    axios.post(`${FAV_URL}`, obj);
    window.location = "favorites.html";
  } else {
    alert("Sign in Pleas!!!");
  }
}
//new trending outfits
const NEW_TRENDINGS = "http://localhost:3000/newProducts";
let arrCopy2 = [];
let filteredData2 = [];
let num2 = 7;
let mainRow3 = document.querySelector(".mainRow3");
async function fillProducts2() {
  let res = await axios(NEW_TRENDINGS);
  let data = await res.data;
  console.log(data);
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
       <i class="fa-solid fa-heart" onclick=addFav2(${obj.id},this)></i>
        <i class="fa-solid fa-eye"></i>
      </div>
      <div class="actions2" onclick=addBasket(${obj.id})>add basket</div></div>
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
function addFav2(id, icon) {
  console.log(id);
  console.log(icon);
}

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

let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
    heading.style.color = "white";
  }
});

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
// //spinner
// let loader = document.querySelector(".loader");
// window.addEventListener("load", () => {
//   setTimeout(() => {
//     loader.style.display = "none";
//   }, 2000);
// });
//modal
let modalDialog = document.querySelector(".modal-dialog");

async function details(id) {
  let res = await axios(`${PRODUCTS_URL}/${id}`);
  let obj = await res.data;
  modalDialog.innerHTML = `
  <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    View Details:
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col col-6">
                      <div class="img">
                        <img style="height: 400px;
                        width: 100%;
                        object-fit: cover;"
                          src="${obj.img}"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="col col-6" style="display: flex;
                    flex-direction: column;
                    row-gap: 20px;
                    padding: 40px 0;">
  
                      <div class="text-side">
                        <h5>${obj.productName}</h5>
                        <i><span> ${obj.productprice} TL</span></i>
                      </div>
                      <div class="description"> <h5>Description:</h5>Thin straps, straight neck dress. Cotton fabric, side gathers, medallion-trimmed tassels and concealed back zip.</div>
                      <div><h6>STOCK STATUS IN THE STORE:
                    </h6><p>  SHIPPING, EXCHANGES AND RETURNS</p></div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer"></div>
              </div>
`;
}
details();

//cart
const CARD_URL = "http://localhost:3000/card";
async function addBasket(id) {
  let res = await axios(`${PRODUCTS_URL}/${id}`);
  let obj = await res.data;
  await axios.post(`${CARD_URL}`, obj);
  console.log(id);
  addBasket2();
}

let card = document.querySelector(".cart");
console.log(card);
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
let count = [];
let totalPrice;
async function addBasket2() {
  let res = await axios(`${CARD_URL}`);
  let data = await res.data;
  count = data;
  let totalInner = document.querySelector(".total-price");
  var totalChild = data.reduce((accum, item) => accum + +item.productprice, 0);
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
                </div>
                <i class="fa-solid fa-trash-can" onclick=delFun(${obj.id})></i>
              </div>
            </div>
        
    `;
  });
}
//total

addBasket2();
//delete cart
async function delFun(id, btn) {
  await axios.delete(`${CARD_URL}/${id}`);
  addBasket2();
  // let res = await axios(`${CARD_URL}`);
  // // let obj = await res.data;
  // // let filtered = data.filter((obj) => {
  // //   obj.id != id;
  // // });
  // // addBasket2(filtered);
}
