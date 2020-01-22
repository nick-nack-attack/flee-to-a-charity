'use strict';

function initializePage() {
    console.log(` initializePage() is running ... `);
    $('#main-area').html(`
        <div class="card">
        <h2>Having trouble with people around you?</h2>
        <p>It's time to GET OUT OF CH(HERE)AIRITY!</p>
        <p>Abandon all your responsibilites and everyone you love ... to go help people on the exact opposite side of the planet!</p>
        <p>STEP 1: Enter in your data.</p>
        <p>STEP 2: Find a charity to can abscond to on the other side of the world (with a the soonest flight to that location).</p>
        <p>STEP 3: Leave immediately and don't tell anyone anything. Straight up ghost on folks.</p>
        </div>
    `)
}

function generateTopRatedCharities() {
    return `
    <div class="card">
        <img id="watch-dog-image" src="images/charitywatch-logo.png">
        <h2>Check out these Highly Rated Charities Instead</h2>
        <p>Groups included on the CharityWatch Top-Rated list generally spend 75% or more of their budgets on programs, spend $25 or less to raise $100 in public support, do not hold excessive assets in reserve, have met CharityWatch's governance benchmarks, and receive "open-book" status for disclosure of basic financial information and documents to CharityWatch.</p>
        <p><a class="link-button" href="https://www.charitywatch.org/top-rated-charities">Go to Charity Watch</a></p>
        </div>
    
    `
}

function generateReactionCard() {
    return `
    <div class="card">
        <h2>Whoops!</h2>
        <p>Looks like side of the planet is ... the Pacific Ocean</p>
        <img id="antipodeImage"src="images/antiPodesImages.png">
        <p>In geography, the antipode of any spot on Earth is the point on Earth's surface diametrically opposite to it.</p>
        <p>Approximately 15% of land territory is antipodal to other land, representing approximately 4.4% of the Earth's surface. So if you're going over there, I recommend bringing a snorkel!</p>
        <p><a class="close-button">Mark as read</a></p>
        <div id="map">${map}</div>
        </div>
    `
}

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

function displayResults(responseJson, userSubject) {
    console.log(` displayResults() is running ... `);
    $('#main-inputs').empty();
    const theCharity = JSON.stringify(responseJson[0].charityName);
    const theirMission = JSON.stringify(responseJson[0].mission);
    const inCity = JSON.stringify(responseJson[0].mailingAddress.city);
    const inState = JSON.stringify(responseJson[0].mailingAddress.stateOrProvince);
    const ofCategory = JSON.stringify(responseJson[0].irsClassification.nteeType);
    const ofClassification = JSON.stringify(responseJson[0].irsClassification.classification);
    const atUrl = JSON.stringify(responseJson[0].charityNavigatorURL);
    $('#main-area').empty();
    $('#main-area').append(generateReactionCard());
    $('#main-area').append(`
        <div>
        <p>And I did find a ${userSubject} charity near you ...</p>
        <h2>${theCharity}</h2>
        <p>located in ${inCity}, ${inState}</p>
        <p>Category: ${ofCategory}</p>
        <p>${ofClassification}</p>
        <p><a class="learn-more" href="${atUrl}" target="_blank">Learn more</a></p>
        </div>
    `)
    $('#main-area').append(generateTopRatedCharities());
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    return queryItems.join('&')
}

function makeCorsLink(formattedURL) {
    return `https://cors-anywhere.herokuapp.com/${formattedURL}`
}

function getFarthestZipcode(responseJson) {
    console.log(` getFarthestZipcode() is running ... `);
    console.log(`Here is furthest away zipCode: ${JSON.stringify(responseJson.responses[0].zip_codes[0])}`)
    return JSON.stringify(responseJson.responses[0].zip_codes[0]);
}

function getFarAwayZipcode(userZipcode) {
    return userZipcode;
    /*
       console.log(` getFarAwayZipcode() is running ... `);
       const zipApi = 'js-8gx2Xw2m3hVqtsxYoFsC1xJyRjtPSmlMeTuiZSIfTtuYCx6mEKsf7r9TgMVqP9lP';
       const farZipUrl = `https://www.zipcodeapi.com/rest/${zipApi}/radius.json/${userZipcode}/10000/km?minimal`;
       return fetch(farZipUrl)
       .then(response => {
           if (response.ok) {
               return response.json();
           }
           console.log(response.statusText);
           throw new Error(response.statusText);
       })
       .then(responseJson => getFarthestZipcode(responseJson))
       .catch(error => {
           $('#js-error-message').removeClass('hidden').text('Something went wrong: ' + error.message)
       });
     */
}

function getCharity(userSubject, userZipcode) {
    console.log(` getCharity() is running ... `);
    const charityID = '6bc077c3';
    const charityApiKey = 'f847dcb76780f7b7babb31b6249cdfc3' // '42beb0038b32282e5146064515efe2db';
    const charityApiUrl = 'https://api.data.charitynavigator.org/v2/Organizations' //'http://data.orghunter.com/v1/charitysearch';
    const params = {
        app_id: charityID,
        app_key: charityApiKey,
        search: userSubject,
        pageSize: 1,
        zip: userZipcode // getFarAwayZipcode(userZipcode),
    }
    const queryString = formatQueryParams(params);
    const url = charityApiUrl + "?" + queryString;
    const throughServerUrl = makeCorsLink(url) // `https://cors-anywhere.herokuapp.com/${url}`;
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
    initMap()
}

runPage();