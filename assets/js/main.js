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
const hobbiesAPI = 'https://api.api-ninjas.com/v1/hobbies?category='
const cryptoAPI = 'https://api.api-ninjas.com/v1/cryptoprice?symbol=' 

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
            let errorMsg = "Error:  Network response was not ok or invalid query" + response.statusText
            showErrorMessage(errorMsg)
            throw new Error(errorMsg);
        }
        return response.json();
    })
    .then(data => {
        console.log('response');
        showResultsMessage(JSON.stringify(data))
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

function showErrorMessage(msg){
    errors.innerText = msg
}

function showResultsMessage(msg){
    results.innerText = msg
}

function cleanErrorMessage(){
    errors.innerText = ""
}

function cleanResultsMessage(){
    results.innerText = ""
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
        if (checkboxes[i].checked) {
            checked = true;
            break; 
        }
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

function mountQuery(api, parameter){
    const url = api + parameter
    console.log(url);
    return url
}

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    validateUserInput()

    switch(selectedApi){
        case 'hobbies': 
            makeCall(mountQuery(hobbiesAPI, params.value))
            break;
        case 'crypto':
            makeCall(mountQuery(cryptoAPI, params.value))
            break;
    }
})


// makeCall('https://api.api-ninjas.com/v1/hobbies?category=general')



