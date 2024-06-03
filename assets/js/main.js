const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("nav");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let selectedApi = '';

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', function(event) {
        // Your logic here
        if (event.target.checked) {
            console.log(event.target.name + ' API is checked.');
            selectedApi = event.target.name
        }
    });
}

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});


// API Call
const API_KEY = 'bz6koqIYiZhkfoCG6EA+eg==LxKRwGrTzzDFYRit';


function makeCall(url, params=''){
    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': API_KEY,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('response');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

makeCall('https://api.api-ninjas.com/v1/hobbies?category=general')



