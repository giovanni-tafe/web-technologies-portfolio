const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("nav");
let mainMenu = document.getElementById('mainMenu')

menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('hidden')
    mainMenu.classList.toggle('flex')
    mainMenu.classList.toggle('gap-4')
});

