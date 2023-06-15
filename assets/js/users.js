const BASE_URL = "http://localhost:3000/users";

let row = document.querySelector(".row");
async function fillCard() {
  let res = await axios(`${BASE_URL}`);
  let data = await res.data;
  console.log(data);
  data.forEach((obj) => {
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
async function delFun(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  let res = await axios(`${BASE_URL}`);
  let data = await res.data;
  data.filter((obj) => {
    obj.id != id;
  });
}
