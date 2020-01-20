'use strict';

function initializePage() {
    $('#main-area').html(`
        <div class="card">
            <p>Find the furthest away charity that is doing something you're passionate about. So you can abandon all the people in your life to go help some people.</p>
        </div>
    `)
}

function displayResults(responseJson) {
    console.log(` displayResults(${responseJson}) is running ... `);
    $('#main-area').empty();
    $('#main-area').html(`
        <div class="card">
            <h2>Entered Topic</h2>
        </div>
        <div class="card">
            <h3>Charity Name</h3>
            <p>City</p>
            <p>Distance Away</p>
            <p>Description</p>
            <button>Learn more</button>
        </div>
    `)
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    return queryItems.join('&')
}

/*

function getLatLong(responseJson) {
    return responseJson.lat + responseJson.lng;
}

function getDistance(userZipcode) {
    //
    const zipCodeApiKey = 'h3tcRSpUwBu0RrN5ybAeeCfQHeVEfvIlMY7y1nQMF1hrmBmD0tHa7UvSwpQXrH43';
    const zipCodeUrl = 'https://www.zipcodeapi.com/rest/' + zipCodeApiKey + '/info.json/' + userZipcode + '/degrees';
    //
    fetch(zipCodeUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => getLatLong(responseJson))
        .catch(error => {
            $('#js-error-message').removeClass('hidden').text('Something went wrong: ' + error.message)
        });
}

function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }
    else {
        xhr = null;
    }
    return xhr;
}

// let xhr = createCORSRequest('GET', url);
// if (!xhr) {
//    throw new Error('CORS not supported');
// }

function getTitle(text) {
    return text.match('<title>(.*)?</title>')
}

*/

function getCharity(userSubject) {
    console.log(` getCharity(${userSubject}) is running ... `);
    const charityApiKey = '42beb0038b32282e5146064515efe2db';
    const charityApiUrl = 'http://data.orghunter.com/v1/charitysearch';
    const params = {
        user_key: charityApiKey,
        searchTerm: userSubject,
        // zipCode: userZipcode,
        city: 'memphis',
        rows: 1
        // distance: getDistance(userZipcode)
    }
    const queryString = formatQueryParams(params);
    const url = charityApiUrl + "?" + queryString;
    console.log(`This is the url: ${url}`);
    fetch(url, {mode: 'cors'})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#js-error-message').removeClass('hidden').text('Something went wrong: ' + error.message)
        });

}

function watchForm() {
    $('form').submit(event => {
        console.log(' watchForm() is running ... ');
        event.preventDefault();
        const userSubject = $('#subject-you-search-for').val();
        const userZipcode = $('#zipcode-you-live-in').val();
        getCharity(userSubject);
    })
}

function runPage() {
    initializePage();
    watchForm();
}

runPage();