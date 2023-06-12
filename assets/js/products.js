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
