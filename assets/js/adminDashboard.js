const PRODUCTS_URL = "http://localhost:3000/products";
let addProductBtn = document.querySelector(".addProductBtn");
addProductBtn.addEventListener("click", () => {
  window.location = "add-edit-products-form.html";
});
let searchInput = document.querySelector(".searchInput");
let arrCopy = [];
let filteredData = [];
let num = 8;
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
    <div class="col col-lg-3 col-md-4 col-sm-6 ">
<div class="card">
  <div class="img">
    <img src="${obj.img}" alt="" />
    <div class="text-side">
      <span>${obj.productName}</span>
      <span>Price:${obj.productprice}</span>
    </div>
  </div>
  <div class="actions">
    <i class="fa-solid fa-trash" onclick=delFun(${obj.id})></i>
 <a href="add-edit-products-form.html?id=${obj.id}">   <i class="fa-solid fa-pen" ></i></a>
    <i class="fa-solid fa-eye"></i>
  </div>
</div>
</div>

`;
  });
}
fillProducts();

//delete
async function delFun(id) {
  await axios.delete(`${PRODUCTS_URL}/${id}`);
  filteredData = arrCopy
    .filter((obj) => {
      obj.id != id;
    })
    .slice(0, num);
}
//search
searchInput.addEventListener("input", (e) => {
  filteredData = arrCopy
    .filter((obj) => {
      return obj.productName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    })
    .slice(0, num);

  fillProducts();
});
