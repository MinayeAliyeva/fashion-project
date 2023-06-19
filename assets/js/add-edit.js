const PRODUCTS_URL = "http://localhost:3000/products";
let form = document.querySelector(".add-edit-form");
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let imgInput = document.querySelector("#imgInput");
let base64;
//edit
let id = new URLSearchParams(window.location.search).get("id");
async function fillInputsValue() {
  let res = await axios(`${PRODUCTS_URL}/${id}`);
  let data = await res.data;
  productName.value = data.productName;
  productPrice.value = data.productprice;
}
fillInputsValue();
let heading = document.querySelector(".heading");
console.log(heading);
// heading.innerHTML = "j";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let productObj = {
    productName: productName.value,
    productprice: productPrice.value,
    img: base64,
  };
  if (id) {
    heading.innerHTML = "Edit Product";
    await axios.patch(`${PRODUCTS_URL}/${id}`, productObj);
    window.location = "products.html";
  } else {
    await axios.post(`${PRODUCTS_URL}`, productObj);
    heading.innerHTML = "Add Product";
    window.location = "products.html";
  }
});

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const uploadImg = async (e) => {
  const file = e.target.files[0];
  base64 = await convertBase64(file);
};
imgInput.addEventListener("change", (e) => {
  uploadImg(e);
});
