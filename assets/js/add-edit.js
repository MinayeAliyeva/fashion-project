const PRODUCT_URL = "http://localhost:3000/products";
let form = document.querySelector(".add-edit-form");
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let imgInput = document.querySelector("#imgInput");
//edit
let id = new URLSearchParams(window.location.search).get("id");
async function fillInputsValue() {
  let res = await axios(`${PRODUCT_URL}/${id}`);
  let data = await res.data;
  productName.value = data.productName;
  productPrice.value = data.productprice;
}
fillInputsValue();
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let productObj = {
    productName: productName.value,
    productprice: productPrice.value,
    img: `./assets/products-image/${imgInput.value.split("\\")[2]}`,
  };
  if (id) {
    await axios.patch(`${PRODUCT_URL}/${id}`, productObj);
    window.location = "adminDashboard.html";
  } else {
    await axios.post(`${PRODUCT_URL}`, productObj);
    window.location = "adminDashboard.html";
  }
});
