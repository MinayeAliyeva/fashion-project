let tBody = document.querySelector("tbody");
const FAV_URL = "http://localhost:3000/favorites";

async function fillTable() {
  let res = await axios(`${FAV_URL}`);
  let data = res.data;
  tBody.innerHTML = "";
  data.forEach((obj) => {
    tBody.innerHTML += `
    <tr>
    <td>
      <img
        src="${obj.img}"
        alt=""
      />
    </td>
    <td>${obj.productName}</td>
    <td>${obj.productprice}$</td>
    <td>
      <button class="btn btn-success">Add basket</button>
      <button class="btn btn-danger" onclick=deletefav(${obj.id})>Remove Favorites</button>
    </td>
  </tr>
    `;
  });
}
fillTable();

//delete fav
async function deletefav(id) {
  await axios.delete(`${FAV_URL}/${id}`);
  let res = await axios(`${FAV_URL}`);
  let data = res.data;
  data.filter((obj) => {
    obj.id != id;
  });
}
