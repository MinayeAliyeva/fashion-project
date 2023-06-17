// let meniIcon = document.querySelector("#menuIcon");
// let nav = document.querySelector("nav");
// console.log(nav);
// meniIcon.addEventListener("click", () => {
//   nav.classList.toggle("show");
//   meniIcon.classList.contains("fa-bars")
//     ? (meniIcon.classList = "fa-solid fa-xmark")
//     : (meniIcon.classList = "fa-solid fa-bars");
// });

let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
});

//spinner
let loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});

//

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft( time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

//video
let videoPlayer = document.querySelector("#videoPlayer");
let myVideo = document.querySelector("#myVideo");
function stopVideo() {
  videoPlayer.style.display = "none";
}
function playVideo(file) {
  myVideo.scr = file;
  videoPlayer.style.display = "block";
}

