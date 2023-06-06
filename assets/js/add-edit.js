const PRODUCT_URL = "http://localhost:3000/products";
let form = document.querySelector(".add-edit-form");
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let imgInput = document.querySelector("#imgInput");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let productObj = {
    productName: productName.value,
    productprice: productPrice.value,
    img: `./assets/products-image/${imgInput.value.split("\\")[2]}`,
  };
  await axios.post(`${PRODUCT_URL}`, productObj);
  window.location = "adminDashboard.html";
});
