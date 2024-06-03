const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("nav");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const submitButton = document.getElementById('submitToApi')
const params = document.getElementById('parameters')
const errors = document.getElementById('errors')
const results = document.getElementById('response')
let checkboxSelected = false
let validation = false

let selectedApi = '';

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
            throw new Error('Error:  Network response was not ok ' + response.statusText);
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

function showErrorMessage(msg){
    errors.innerText = msg
}

function cleanErrorMessage(){
    errors.innerText = ""
}

for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', function(event) {
        if (event.target.checked) {
            console.log(event.target.name + ' API is checked.');
            selectedApi = event.target.name
            checkboxSelected = true
        }
    });
}

function validateUserInput(){
    let checked = false;
    for (let i = 0; i < checkboxes.length; i++) {
        checked = checkboxes[i].checked ? true : false;
    }

    if(checked == false){
        showErrorMessage('Please select a checkbox')
        return;
    }

    if(params.value == ""){
        showErrorMessage('Please add a parameter')
        return;
    }

    cleanErrorMessage()

}

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    validateUserInput()
})


// makeCall('https://api.api-ninjas.com/v1/hobbies?category=general')



