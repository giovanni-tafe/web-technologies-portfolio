let mainMenu = document.getElementById('mainMenu')
let menuToggle = document.getElementById('menuToggle')

menuToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('hidden')
    mainMenu.classList.toggle('flex')
    mainMenu.classList.toggle('gap-4')
});