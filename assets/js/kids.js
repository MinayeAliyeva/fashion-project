let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
console.log(nav);
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});



// let logo=document.querySelector(".logo")
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  header.style.transition = "0.5s";
  // logo.style.color="black"
  // if (scrollY == 0) {
  //   header.style.backgroundColor = "transparent";
  //   heading.style.color = "black";
  // }
});

// //spinner
// let loader = document.querySelector(".loader");
// window.addEventListener("load", () => {
//   setTimeout(() => {
//     loader.style.display = "none";
//   }, 2000);
// });

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

//

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
// //search product
// let searchProduct = document.querySelector(".searchProduct");
// searchProduct.addEventListener("input", (e) => {
//   filteredData = arrCopy
//     .filter((obj) => {
//       return obj.productName
//         .toLocaleLowerCase()
//         .includes(e.target.value.toLocaleLowerCase());
//     })
//     .slice(0, num);
//   fillProducts();
// });
// //sort
// let select = document.querySelector("#select");
// select.addEventListener("change", (e) => {
//   console.log(e.target.value);
//   if (e.target.value == "from low to high") {
//     filteredData = filteredData.sort((a, b) => a.productprice - b.productprice);
//     fillProducts();
//   } else if (e.target.value == "from high to low") {
//     filteredData = filteredData.sort((a, b) => b.productprice - a.productprice);
//     fillProducts();
//   } else {
//     filteredData = arrCopy;
//     fillProducts();
//   }
// });
// //loadmore
// let loadMore = document.querySelector(".loadMore");
// console.log(loadMore);
// loadMore.addEventListener("click", (e) => {
//   num += 3;
//   filteredData = arrCopy
//     .filter((obj) => {
//       return obj.productName
//         .toLocaleLowerCase()
//         .includes(e.target.value.toLocaleLowerCase());
//     })
//     .slice(0, num);
//   fillProducts();
// });

