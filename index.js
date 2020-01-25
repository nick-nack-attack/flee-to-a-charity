'use strict';

// Generates card explaining functionality of app
function initializePage() {
    $('#main-area').html(`
        <div class="card">
            <h2>Abandon your responsibilites</h2>
                <div id="sub-header">
                    <img id="plane-image" src="images/plane.png" alt="white plane with blue wings">
                    <p><i>... Adios to every<br>one you love !</i></p>
                </div>
            <p>Help people on the exact opposite of the planet.</p>
            <p class="step-font">STEP 1</p><p>Enter your data below.</p>
            <p class="step-font">STEP 2</p><p>Get matched to a charity on the other side of the planet.</p>
            <p class="step-font">STEP 3</p><p>Leave immediately and, like, don't, tell anyone anything.</p>
        </div>
    `)
}

// Card referring user to top rated charities
function generateTopRatedCharities() {
    return `
        <div class="card result-card">
            <img id="watch-dog-image" src="images/charitywatch-logo.png" alt="charity watch logo">
            <h2>Check out these Highly Rated Charities Instead</h2>
                <p>Groups included on the CharityWatch Top-Rated list generally spend 75% or more of their budgets on programs, spend $25 or less to raise $100 in public support, do not hold excessive assets in reserve, have met CharityWatch's governance benchmarks, and receive "open-book" status for disclosure of basic financial information and documents to CharityWatch.</p>
                <div class="learn-more"><p><a class="link-button" href="https://www.charitywatch.org/top-rated-charities" target="_blank">Go to Charity Watch</a></p></div>
        </div>
    `
}

// Card explaining antipodes and link to Wikipedia
function generateReactionCard() {
    return `
    <div class="card result-card">
        <h2>Results</h2>
            <p>Whoops ... other side of the planet is ... the Pacific Ocean.</p>
            <img id="antipodeImage"src="images/antiPodesImages.png" alt="images of earth antipodes">
            <p>The antipode, in geography, of any spot on Earth is the point on Earth's surface diametrically opposite to it.</p>
            <p>If you dig a hole, in a straight line through the center of the Earth, you would come out on the other side in China, right? Wrong! </p>
            <p>You'll end up in the ocean!</p>
                <img class="map-image" alt="map showing man's sticking his head into the ground in New York" src="images/in_ny.png">               
                <img class="map-image" alt="map showing man's head popping out in the Indian Ocean" src="images/out_pacific.png">
                <p class="image-caption">https://www.antipodesmap.com/</p>
            <p>The only places where a straight hole will emerge in China are parts in Argentina and Chile.</p>
            <div class="learn-more"><p><a class="link-button" href="https://en.wikipedia.org/wiki/Antipodes" target="_blank">Open Wikipedia</a></p></div>
    </div>
    `
}

// Display the charity that is returned from API
function displayResults(responseJson, userSubject) {
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
        <div class="card result-card">
            <p>And I did find a ${userSubject} charity near you ...</p>
            <h2>${theCharity}</h2>
                <p>located in ${inCity}, ${inState}</p>
                <p>Category: ${ofCategory}</p>
                <p>${ofClassification}</p>
            <div class="learn-more"><p><a href="${atUrl}" target="_blank">Learn more</a></p></div>
        </div>
    `)
    $('#main-area').append(generateTopRatedCharities());
}

// Turns the charity api query keys and values into a string
function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    return queryItems.join('&')
}

// Makes a CORS link necessary for the charity API
function makeCorsLink(formattedURL) {
    return `https://cors-anywhere.herokuapp.com/${formattedURL}`
}

// Use the user submitted subject and zipcode to return a charity from API
function getCharity(userSubject, userZipcode) {
    const charityID = '6bc077c3';
    const charityApiKey = '3622b5079d43947cb65b10dc6762ae41'
    const charityApiUrl = 'https://api.data.charitynavigator.org/v2/Organizations'
    const params = {
        app_id: charityID,
        app_key: charityApiKey,
        search: userSubject,
        pageSize: 1,
        zip: userZipcode
    }
    const queryString = formatQueryParams(params);
    const url = charityApiUrl + "?" + queryString;
    const throughServerUrl = makeCorsLink(url)
    fetch(throughServerUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            $('')
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, userSubject))
        .catch(error => {
            $('#js-error-message').removeClass('hidden').text('Something went wrong: ' + error.message)
        });
}

// This looks with hawkeyes on the submit button
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userSubject = $('#subject-you-search-for').val();
        const userZipcode = $('#zipcode-you-live-in').val();
        getCharity(userSubject, userZipcode);
    })
}

// This fires up the first card and the form
function runPage() {
    initializePage();
    watchForm();
}

// This runs ... the page
runPage();