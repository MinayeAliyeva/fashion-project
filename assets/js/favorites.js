let tBody = document.querySelector("tbody");
const FAV_URL = "http://localhost:3000/favorites";
let tbody = document.querySelector("tbody");
async function fetFav() {
  let res = await axios(`${FAV_URL}`);
  let data = await res.data;
  console.log(data);
  tbody.innerHTML = "";
  data.forEach((obj) => {
    tbody.innerHTML += `
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
                  <button class="btn btn-danger" onclick=removeFav(${obj.id},this)>Remove Favorites</button>
                </td>
              </tr>
    `;
  });
}
fetFav();

async function removeFav(id, t) {
  axios.delete(`${FAV_URL}/${id}`);
  t.closest("tr").remove();
}
