let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.backgroundColor = "white";
  header.style.transition = "0.5s";
  if (scrollY == 0) {
    header.style.backgroundColor = "transparent";
  }
});
let meniIcon = document.querySelector("#menuIcon");
let nav = document.querySelector("nav");
console.log(nav);
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
//
const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");
class Carusel {
  constructor(container, items, controls) {
    this.caruselContainer = container;
    this.caruselControls = controls;
    this.caruselArray = [...items];
  }
  updateGallery() {
    this.caruselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      el.classList.remove("gallery-item-4");
      el.classList.remove("gallery-item-5");
    });
    this.caruselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }
  setCurrentState(direction) {
    if (direction.className == "gallery-controls-previous") {
      this.caruselArray.unshift(this.caruselArray.pop());
    } else {
      this.caruselArray.push(this.caruselArray.shift());
    }
    this.updateGallery();
  }
  setControls() {
    this.coruselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        (document.createElement(
          "button"
        ).className = `gallery-controls-${control}`)
      );
      document.querySelector(`gallery-controls-${control}`).innerText = control;
    });
  }
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}
const exampleCorusel = new Carusel(
  galleryContainer,
  galleryItems,
  galleryControls
);
// exampleCorusel.setControls();
exampleCorusel.useControls()
