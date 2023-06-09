let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
});