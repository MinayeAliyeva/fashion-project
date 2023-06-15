const BASE_URL = "http://localhost:3000/users";
let row = document.querySelector(".row");
let searchInput2 = document.querySelector(".searchInput2");
let arrCopy = [];
let filteredData = [];
let num = 10;
async function fillCard() {
  let res = await axios(BASE_URL);
  let data = await res.data;
  arrCopy = data;
  filteredData = filteredData.length ? filteredData : data;
  row.innerHTML = "";
  filteredData.forEach((obj) => {
    row.innerHTML += `
    <div class="col-lg-3">
    <div class="card">
      <img src="${obj.img}" alt="" />
      <div class="text-side">
        <p>${obj.userName}  ${obj.lastName}</p>
        <span>${obj.email}</span> <br>
      <button onclick=delFun(${obj.id})>Delete User</button>
      </div>
    </div>
  </div> 
        `;
  });
}
fillCard();
//delete
async function delFun(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  filteredData = arrCopy.filter((obj) => {
    obj.id != id;
  });
}
//
searchInput2.addEventListener("input", (e) => {
  filteredData = arrCopy.filter((obj) => {
    return obj.userName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });

  fillCard();
});
