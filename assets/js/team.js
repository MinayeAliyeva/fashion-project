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
