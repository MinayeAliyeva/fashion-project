const NEW_TRENDINGS = "http://localhost:3000/newtrending-products";
let form2 = document.querySelector("#form2");
let productName2 = document.querySelector("#productName2");
let productPrice2 = document.querySelector("#productPrice2");
let imgInput2 = document.querySelector("#imgInput2");
//edit
let id = new URLSearchParams(window.location.search).get("id");
async function fillInputsValue() {
  let res = await axios(`${NEW_TRENDINGS}/${id}`);
  let data = await res.data;
  productName2.value = data.productName;
  productPrice2.value = data.productprice;
}
fillInputsValue();
form2.addEventListener("submit", async (e) => {
  e.preventDefault();
  let productObj = {
    productName: productName2.value,
    productprice: productPrice2.value,
    img: `./assets/products-image/${imgInput2.value.split("\\")[2]}`,
  };
  if (id) {
    await axios.patch(`${NEW_TRENDINGS}/${id}`, productObj);
    window.location = "adminDashboard.html";
  } else {
    await axios.post(`${NEW_TRENDINGS}`, productObj);
    window.location = "adminDashboard.html";
  }
});
