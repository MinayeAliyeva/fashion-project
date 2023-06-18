//menubar
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
//header
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.background = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
});
//products
const PRODUCTS_URL = "http://localhost:3000/products";
let arrCopy = [];
let filteredData = [];
let num = 4;
let mainRow = document.querySelector(".mainRow");

async function fillProducts() {
  let res = await axios(PRODUCTS_URL);
  let data = await res.data;
  arrCopy = data;
  filteredData = filteredData.length
    ? filteredData.slice(0, num)
    : data.slice(0, num);
  mainRow.innerHTML = "";
  filteredData.forEach((obj) => {
    mainRow.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-12 products-title">
    <div class="card " >
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
  filteredData = arrCopy.slice(0, num).filter((obj) => {
    return obj.productName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
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
loadMore.addEventListener("click", (e) => {
  num += 4;
  filteredData = arrCopy
    .filter((obj) => {
      return obj.productName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    })
    .slice(0, num);
  console.log(filteredData);

  fillProducts();
});
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
  let res = await axios(`${PRODUCTS_URL}/${id}`);
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
    let res = await axios(`${PRODUCTS_URL}/${id}`);
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
     
          <div class="text-side">
            <h5>${obj.productName}</h5>
            <i><span> ${obj.productprice} TL</span></i>
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
