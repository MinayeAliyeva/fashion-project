const NEWPRODUCTS_URL = "http://localhost:3000/newtrending-products";
let form2 = document.querySelector("#form2");
let productName2 = document.querySelector("#productName2");
let productPrice2 = document.querySelector("#productPrice2");
let imgInput2 = document.querySelector("#imgInput2");
let base64;
//edit
let id = new URLSearchParams(window.location.search).get("id");
async function fillInputsValue() {
  let res = await axios(`${NEWPRODUCTS_URL}/${id}`);
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
    img: base64,
  };
  if (id) {
    await axios.patch(`${NEWPRODUCTS_URL}/${id}`, productObj);
    window.location = "new-admin-products.html";
  } else {
    await axios.post(`${NEWPRODUCTS_URL}`, productObj);
    window.location = "new-admin-products.html";
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
imgInput2.addEventListener("change", (e) => {
  uploadImg(e);
});
