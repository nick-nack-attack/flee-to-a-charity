# Flee to a Charity

An app to help users find a charity on the opposite side of the planet. Why? To abandon all your responsibilities and loved ones to go help people you've never seen before, tha's why!

## Motivation

![Untapped Potential](images/graph!.jpg)

I thought about doing an app to find a charity near the user. But I'm sure that's been done. So the idea of finding the invers 

## Build Status

[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://nick-nack-attack.github.io/flee-to-a-charity)

## Wireframes
Login Screen/Landing Page:

![login screen](screenshots/login.png)

About:

![about](screenshots/about.png)

Library:

![library](screenshots/library.png)

Recommendations:

![recommendations](screenshots/recommendations.png)

## Environment Setup

1. Setup your own postgress server
2. Run the database_script.sql file to build your table structure
3. Create a .env file in your server folder which contains the path to your database as well as your client id and secret
4. Obtain a client id and secret by setting up your app with [the google developers console](https://console.developers.google.com/)
5. Run your project with
```
npm run dev
```

## Running the tests

To run all tests, run
```
npm test
```
To run just the front/back end tests, run
```
npm run test:server

npm run test:client
```

## Built With

### Front-End
* React
* Redux
* React-Router

### Back-End
* Postgress
* Express
* Node
* Knex

### Testing
* Mocha
* Chai
* Chai-http
* Jest

## Features

* Create a list of books
* Add your favorite books
* Like lists to get recommendations
* See every book currently in the library

## Demo

- [Live Demo](https://book-thing.herokuapp.com/)

## Authors

* **Sonja Duric** - ** - Database design/Back-End development
* **Jonathan Fitzgibbon** - ** - Back-End development/testing
* **Tanner Gill** - ** - Front-End development/testing, styling
* **Patrice White** - ** - Front-End development/testing, styling

## Acknowledgments

* **Ben Pardo** - ** - The Great Savior, The Wise Sage
