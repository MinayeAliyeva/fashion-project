let row = document.querySelector(".row");
const MESSAG_URL = "http://localhost:3000/message";

async function fillMesage() {
  let res = await axios(`${MESSAG_URL}`);
  console.log(res);
  let data = await res.data;
  row.innerHTML = "";
  data.forEach((obj) => {
    row.innerHTML += `
    <div class="col-lg-4 column-gap-4">
            <div class="testimional-box">
              <div class="box-top">
                <div class="profile">
                  <img src="${obj.img}" />
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

//
const MESSAGE_URL = "http://localhost:3000/message";
let counter2 = document.querySelector(".counter2");
let count2 = [];

async function notification() {
  let res = await axios(`${MESSAGE_URL}`);
  let data = await res.data;
  count2 = data;
  counter2.innerHTML = count2.length;
}
notification()