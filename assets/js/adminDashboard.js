const PRODUCTS_URL = "http://localhost:3000/products";
let tBody = document.querySelector("tbody");
let searchInput = document.querySelector(".searchInput");
let arrCopy = [];
let filteredData = [];
let num = 10;
async function drawTable() {
  let res = await axios(PRODUCTS_URL);
  let data = await res.data;
  arrCopy = data;
  filteredData = filteredData.length ? filteredData : data;
  tBody.innerHTML = "";
  filteredData.forEach((obj) => {
    tBody.innerHTML += `
        <tr>
        <td>${obj.id}</td>
        <td>  <img src="${obj.img}" alt=""></td>
        <td>${obj.productName}</td>
        <td>${obj.productprice}</td>
        <td>
        <div class="actions">
         <a href="add-edit-products-form.html?id=${obj.id}"><i class="fa-solid fa-pen"></i></a>
         <i class="fa-solid fa-trash"  onclick=delFun(${obj.id})></i>
         <i class="fa-solid fa-eye"></i>
        </div>
       </td>
      </tr>
        `;
  });
}
drawTable();

//delete
async function delFun(id) {
  await axios.delete(`${PRODUCTS_URL}/${id}`);
  filteredData = arrCopy.filter((obj) => {
    obj.id != id;
  });
}
//search
searchInput.addEventListener("input", (e) => {
  filteredData = arrCopy.filter((obj) => {
    return obj.productName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });

  drawTable();
});
//sort
let select = document.querySelector("#select");
select.addEventListener("change", (e) => {
  if (e.target.value == "from cheap to expensive") {
    filteredData = filteredData.sort((a, b) => a.productprice - b.productprice);
    drawTable();
  } else if (e.target.value == "from expensive to cheap") {
    filteredData = filteredData.sort((a, b) => b.productprice - a.productprice);
    drawTable();
  } else {
    filteredData = arrCopy;
    drawTable();
  }
});

// //new trendings
// const NEW_TRENDINGS = "http://localhost:3000/newtrending-products";
// let addProductBtn2 = document.querySelector(".addProductBtn2");
// addProductBtn2.addEventListener("click", () => {
//   window.location = "add-edit-new-products-form.html";
// });

// let searchInput2 = document.querySelector(".searchInput2");
// let arrCopy2 = [];
// let filteredData2 = [];
// let num2 = 10;
// let mainRow2 = document.querySelector(".mainRow2");
// async function fillProducts2() {
//   let res = await axios(NEW_TRENDINGS);
//   let data = await res.data;
//   arrCopy2 = data;
//   filteredData2 = filteredData2.length
//     ? filteredData2.slice(0, num2)
//     : data.slice(0, num2);
//   mainRow2.innerHTML = "";
//   filteredData2.forEach((obj) => {
//     mainRow2.innerHTML += `
//     <div class="col col-lg-1 ">
// <div class="card">
//   <div class="img">
//     <img src="${obj.img}" alt="" />
//     <div class="text-side">
//       <span>${obj.productName}</span>
//       <span>Price:${obj.productprice}</span>
//     </div>
//   </div>
//   <div class="actions">
//     <i class="fa-solid fa-trash" onclick=delFun2(${obj.id})></i>
//  <a href="add-edit-new-products-form.html?id=${obj.id}">   <i class="fa-solid fa-pen" ></i></a>
//     <i class="fa-solid fa-eye"></i>
//   </div>
// </div>
// </div>

// `;
//   });
// }
// fillProducts2();

// //delete
// async function delFun2(id) {
//   await axios.delete(`${NEW_TRENDINGS}/${id}`);
//   filteredData = arrCopy
//     .filter((obj) => {
//       obj.id != id;
//     })
//     .slice(0, num);
// }
// //search
// searchInput2.addEventListener("input", (e) => {
//   filteredData2 = arrCopy2
//     .filter((obj) => {
//       return obj.productName
//         .toLocaleLowerCase()
//         .includes(e.target.value.toLocaleLowerCase());
//     })
//     .slice(0, num);

//   fillProducts2();
// });
// //sort
// let select = document.querySelector("#select");
// select.addEventListener("change", (e) => {
//   if (e.target.value == "from cheap to expensive") {
//     filteredData = filteredData.sort((a, b) => a.productprice - b.productprice);
//     fillProducts();
//   } else if (e.target.value == "from expensive to cheap") {
//     filteredData = filteredData.sort((a, b) => b.productprice - a.productprice);
//     fillProducts();
//   }
// });
