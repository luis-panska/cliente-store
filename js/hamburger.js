window.addEventListener("load", function () {
  const hamburger = document.querySelector(".nav-hamburger");
  const navList = document.querySelector(".nav-list");
  hamburger.addEventListener("click", function () {
    navList.classList.toggle("nav-list-active");
  });
});
