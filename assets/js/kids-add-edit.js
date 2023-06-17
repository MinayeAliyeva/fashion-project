const KIDS_URL = "http://localhost:3000/kids";
let form5 = document.querySelector("#form5");
let productName5 = document.querySelector("#productName5");
let productPrice5 = document.querySelector("#productPrice5");
let imgInput5 = document.querySelector("#imgInput5");
let base64;
//edit
let id = new URLSearchParams(window.location.search).get("id");
async function fillInputsValue() {
  let res = await axios(`${KIDS_URL}/${id}`);
  let data = await res.data;
  productName5.value = data.productName;
  productPrice5.value = data.productprice;
}
fillInputsValue();
form5.addEventListener("submit", async (e) => {
  e.preventDefault();
  let productObj = {
    productName: productName5.value,
    productprice: productPrice5.value,
    img: base64,
  };
  if (id) {
    await axios.patch(`${KIDS_URL}/${id}`, productObj);
    window.location = "kidsDashboard.html";
  } else {
    await axios.post(`${KIDS_URL}`, productObj);
    window.location = "kidsDashboard.html";
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
imgInput5.addEventListener("change", (e) => {
  uploadImg(e);
});
