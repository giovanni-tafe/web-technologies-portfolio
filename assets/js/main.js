const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});
