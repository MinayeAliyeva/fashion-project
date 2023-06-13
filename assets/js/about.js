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

let heading = document.querySelector(".header h2");
let anchors = document.querySelectorAll(".navUl a");
let drops = document.querySelectorAll(".dropdown button");
console.log(drops);
let header = document.querySelector("header");
console.log(drops);
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  heading.style.color = "black";
  header.style.transition = "0.5s";
  anchors.forEach((a) => {
    a.style.color = "black";
  });
  drops.forEach((drop) => {
    drop.style.color = "black";
  });
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
    heading.style.color = "white";
    anchors.forEach((a) => {
      a.style.color = "white";
    });
    drops.forEach((drop) => {
      drop.style.color = "white";
    });
  }
});
