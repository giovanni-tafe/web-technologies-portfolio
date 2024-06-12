const radio = document.querySelectorAll('input[name="apiSelect"]');
const submitButton = document.getElementById('submitToApi')
const params = document.getElementById('parameters')
const errors = document.getElementById('errors')
const results = document.getElementById('response')
const suggestedParameters = document.getElementById('suggestedParameters')
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
            let errorMsg = "Error:  Invalid Query, try a valid parameter" + response.statusText
            showErrorMessage(errorMsg)
            throw new Error(errorMsg);
        }
        return response.json();
    })
    .then(data => {
        showResultsMessage(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

function showErrorMessage(msg){
    errors.innerText = msg
}

function showResultsMessage(data){
    results.innerText = ''

    for(const key in data){
        if(data.hasOwnProperty(key)){
            const p = document.createElement('p')
            p.textContent = `${key}: ${data[key]}`
            results.appendChild(p)
        }
    }
}

function cleanErrorMessage(){
    errors.innerText = ""
}

function cleanResultsMessage(){
    results.innerText = ""
}


function suggestParameters(params){
    suggestedParameters.innerText = params
}

function validateUserInput(){
    let checked = false;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            checked = true;
            break; 
        }
    }

    if(checked == false){
        showErrorMessage('Please select a checkbox')
        return false;
    }

    if(params.value == ""){
        showErrorMessage('Please add a parameter')
        return false;
    }

    cleanErrorMessage()

    return true
}

function mountQuery(api, parameter){
    const url = api + parameter
    return url
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const valid = validateUserInput()

    if( !valid ) return;  

    switch(selectedApi){
        case 'hobbies': 
            makeCall(mountQuery(hobbiesAPI, params.value))
            break;
        case 'crypto':
            makeCall(mountQuery(cryptoAPI, params.value))
            break;
    }
})


radio.forEach(item => {
    item.addEventListener('click', (event) => {

        let api = event.target.value
        if (event.target.checked) {
            selectedApi = api
            checkboxSelected = true

            selectedApi === 'hobbies' ? suggestParameters('Hobbie Category: i.e. general, sports_and_outdoors,education, collection,competition,observation'): ''
            selectedApi === 'crypto' ? suggestParameters('Crypto Symbol: i.e. LTCBTC, BTCUSD'): ''
        }
    })
});