//accardion
const accardionContent = document.querySelectorAll(".accardion-content");
accardionContent.forEach((item, index) => {
  let header1 = item.querySelector(".header1");
  header1.addEventListener("click", () => {
    item.classList.toggle("open");
    let description = item.querySelector(".description");
    console.log(item);
    console.log(description.scrollHeight);
    console.log(description);
    if (item.classList.contains("open")) {
      description.style.height = `${description.scrollHeight}px`;
      item.querySelector("i").classList.replace("fa-plus", "fa-minus");
      console.log("hh");
    } else {
      description.style.height = "0px";
      item.querySelector("i").classList.replace("fa-minus", "fa-plus");
      console.log("nn");
    }
    removeOpen(index);
  });
});

function removeOpen(index1) {
  accardionContent.forEach((item2, index2) => {
    if (index1 != index2) {
      item2.classList.remove("open");
      let des = item2.querySelector(".description");
      des.style.height = "0px";
      item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
  });
}