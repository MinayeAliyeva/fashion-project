var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

//header
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.background = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
});
// let heading = document.querySelector(".header h2");
// let anchors = document.querySelectorAll(".navUl a");
// let drops = document.querySelectorAll(".dropdown button");
// console.log(drops);
// let header = document.querySelector("header");
// console.log(drops);
// window.addEventListener("scroll", () => {
//   header.style.backgroundColor = "white";
//   heading.style.color = "black";
//   header.style.transition = "0.5s";
//   anchors.forEach((a) => {
//     a.style.color = "black";
//   });
//   drops.forEach((drop) => {
//     drop.style.color = "black";
//   });
//   if (scrollY == 0) {
//     header.style.backgroundColor = "transparent";
//     heading.style.color = "white";
//     anchors.forEach((a) => {
//       a.style.color = "white";
//     });
//     drops.forEach((drop) => {
//       drop.style.color = "white";
//     });
//   }
// });

//menubar
let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
meniIcon.addEventListener("click", () => {
  nav.classList.toggle("show");
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});
//
let toTop = document.getElementById("toTop");
toTop.style.display = "none";
window.addEventListener("scroll", () => {
  if (this.scrollY > 110) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//spinner
let loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 2000);
});
