let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector(".menu");
console.log(nav);
meniIcon.addEventListener("click", () => {
    nav.classList.toggle("show")
  meniIcon.classList.contains("fa-bars")
    ? (meniIcon.classList = "fa-solid fa-xmark")
    : (meniIcon.classList = "fa-solid fa-bars");
});
