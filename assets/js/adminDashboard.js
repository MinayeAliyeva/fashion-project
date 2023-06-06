const PRODUCTS_URL = "http://localhost:3000/products";
let addProductBtn = document.querySelector(".addProductBtn");
addProductBtn.addEventListener("click", () => {
  window.location = "add-edit-products-form.html";
});
let searchInput = document.querySelector(".searchInput");
let arrCopy = [];
let filteredData = [];
let num = 3;
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
    <div class="col col-lg-3">
          <div class="card">
            <div class="img">
              <img src="${obj.img}" alt="" />
              <div class="text-side">
                <span>${obj.productName}</span>
                <span>Price:${obj.productprice}</span>
             
              </div>
            </div>
          </div>
        </div>
`;
  });
}
fillProducts();
