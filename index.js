'use strict';

function initializePage() {
    $('#main-area').html(`
        <div class="card">
            <p>Find the furthest away charity that is doing something you're passionate about. So you can abandon all the people in your life to go help some people.</p>
        </div>
    `)
}

function displayResults(responseJson, userSubject) {
    console.log(` displayResults(${responseJson}) is running ... `);
    const theCharity = JSON.stringify(responseJson[0].charityName);
    const theirMission = JSON.stringify(responseJson[0].mission);
    const inCity = JSON.stringify(responseJson[0].mailingAddress.city);
    const inState = JSON.stringify(responseJson[0].mailingAddress.stateOrProvince);
    const ofCategory = JSON.stringify(responseJson[0].irsClassification.nteeType);
    const ofClassification = JSON.stringify(responseJson[0].irsClassification.classification);
    const atUrl = JSON.stringify(responseJson[0].charityNavigatorURL);
    console.log(theCharity, inCity, ofCategory, atUrl);
    $('#main-area').empty();
    $('#main-area').html(`
        <div>
        <p>Your ${userSubject} charity is ...</p>
        <h2>${theCharity}</h2>
        <p>located in ${inCity}, ${inState}</p>
        <p>Category: ${ofCategory}</p>
        <p>${ofClassification}</p>
        <p>Their mission is: ${theirMission}</p>
        <p><a class="learn-more" href="${atUrl}" target="_blank">Learn more</a></p>
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

*/

function getCharity(userSubject, userZipcode) {
    console.log(` getCharity(${userSubject}) is running ... `);
    const charityID = '6bc077c3';
    const charityApiKey = 'f847dcb76780f7b7babb31b6249cdfc3' // '42beb0038b32282e5146064515efe2db';
    const charityApiUrl = 'https://api.data.charitynavigator.org/v2/Organizations' //'http://data.orghunter.com/v1/charitysearch';
    const params = {
        app_id: charityID,
        app_key: charityApiKey,
        search: userSubject,
        pageSize: 1,
        zip: userZipcode,
        // zipCode: userZipcode,
        // distance: getDistance(userZipcode)
    }
    const queryString = formatQueryParams(params);
    const url = charityApiUrl + "?" + queryString;
    const throughServerUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    console.log(throughServerUrl);
    fetch(throughServerUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, userSubject))
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
        getCharity(userSubject, userZipcode);
    })
}

function runPage() {
    initializePage();
    watchForm();
}

runPage();