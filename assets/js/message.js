let row = document.querySelector(".row");
const MESSAG_URL = "http://localhost:3000/message";

async function fillMesage() {
  let res = await axios(`${MESSAG_URL}`);
  console.log(res);
  let data = await res.data;
  row.innerHTML = "";
  data.forEach((obj) => {
    row.innerHTML += `
    <div class="col-lg-6">
            <div class="testimional-box">
              <div class="box-top">
                <div class="profile">
                  <img src="./assets/userImg/user2.png" alt="" />
                </div>
                <div class="name-user">
                  <strong>${obj.fullName}</strong>
                  <span>${obj.email}</span>
                </div>
                <div class="reviews">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </div>
              </div>
              <div class="comments">
                <p>
            ${obj.message}
                </p>
              </div>
            </div>
          </div>
    `;
  });
}
fillMesage();
