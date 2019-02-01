let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get('id');
let path = window.location.pathname;

// Gets the people's data from the database
function getPeopleData() {
    fetch(`/people`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.map(updatePeople);
        });
}

// Updates the page with the people's data
function updatePeople(person) {
    $(`.people`).append(
        `
        <div class="person col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <a class="mx-auto d-block" href="./person.html?id=${person.id}">
                 <img src="${person.picture}" alt="${person.name}">
            </a>
            <p class="name text-center">${person.name} ${person.surname}</p>
            <p class="profession text-center">${person.profession}</p>
        </div>
        `);
}

// Gets the person's data from the database
function getPersonData() {
    fetch(`/people/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.map(updatePerson);
        });
}

// Updates the page with the person's data
function updatePerson(person) {
    $(`title`).append(`${person.name} ${person.surname} | Ariel Care Center`);
    $(`#bc-person`).append(`${person.name} ${person.surname}`);
    $('#name').append(`${person.name} ${person.surname}`);
    $('#info').append(`<strong>Telephone Number:</strong> ${person.tel} </br> <strong>Email Address:</strong> ${person.mail}`);
    if(`${person.serviceId}` !== 'null') {
        $('#department').append(
            `
            <h2>Department manager:</h2>
            <a href="./service.html?id=${person.serviceId}">${person.serviceName}</a>
            `);
    }
    $('.picture').append(`<img id="picture" style="width:100%" src="${person.picture}" alt="person">`);
    $('#cv').append(`${person.cv}`);
}

// Gets the locations' data from the database
function getLocationsData() {
    fetch(`/locations`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.map(updateLocations);
        });
}

// Updates the page with the locations' data
function updateLocations(location) {
    if(path === "/pages/all-locations.html") {
        $(`.locations`).append(
            `
            <div class="location col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <h4 class="text-center">${location.name}</h4>
                <p class="address text-center">${location.address} - ${location.city}</p>
                <a class="mx-auto d-block" href="./location.html?id=${location.id}">
                    <img style="height:auto" src="${location.picture}" alt="${location.name}">
                </a>
            </div>
            `);
    }
    else if(path === "/pages/contact-us.html") {
        $(`#contacts`).append(
            `
            <div class="col-6 col-sm-4 col-lg-2">
                <div class="contact text-center">
                  <h5>${location.name}</h5>
                  <p>${location.address} - ${location.city}</p>
                  <p>${location.tel}</p>
                </div>
              </div>
            `
        );
    }
}

// Gets the location's data from the database
function getLocationData() {
    fetch(`/locations/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.map(updateLocation);
        });
}

// Updates the page with the location's data
function updateLocation(location) {
    $(`title`).append(`${location.city} | Ariel Care Center`);
    $(`#bc-location`).append(`${location.name}`);
    $('#name').append(`${location.name}`);
    $('#loc-picture').append(`<img style="height:auto" class="locationsPic" src="${location.picture}" alt="${location.name}">`);
    $('#loc-desc').append(`${location.description}`);
    $('#loc-info').append(`<b>Telephone Number:</b> ${location.tel} </br> ${location.information}`);
    $('#services').append(`<a href="./service.html?id=${location.serviceId}">${location.serviceName}</a><br>`);
    $('#loc-map').append(`<iframe src="${location.map}" width="100%" height="300" frameborder="0" style="border:1px solid lightgray" allowfullscreen></iframe>`);
}

// Gets the services' data from the database
function getServicesData() {
    fetch(`/services`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.map(updateServices);
        });
}

// Updates the page with the services' data
function updateServices(service) {

    $(`#subs`).append(`<li><input id="${service.locationId}" name="group1" type="radio"> ${service.locationName}</li>`);
    $(`#newContent`).append(`<li><a class="nav-link" href="./service.html?id=${service.id}">${service.name}</a></li>`);
    $(`#subs1`).append(
        `
        <h3 class="loc${service.locationId}">${service.locationName}</h3>
        <li class="loc${service.locationId}"><a class="nav-link" href="./service.html?id=${service.id}">${service.name}</a></li>
        `
    );
 } 

// Gets the service's data from the database
function getServiceData() {
    fetch(`/services/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.map(updateService);
        });
}

// Updates the page with the service's data
function updateService(service) {
    $(`title`).append(`${service.name} | Ariel Care Center`);
    $(`#bc-service`).append(`${service.name}`);
    $(`#name`).append(`${service.name}`);
    $(`#serv-desc`).append(`${service.description}`);
    $(`#serv-goals`).append(`${service.goals}`);
    $(`#serv-hta`).append(
        `
        The service is held in <a href="./location.html?id=${service.locationId}">${service.locationName}</a>.<br>
                  For more information please contact:<br>
                  <a href="./person.html?id=${service.personId}">${service.personName} ${service.personSurname}</a>.
        `
    );
}

// Gets data according to the page
function startup() {
    switch(path) {
        case "/pages/all-people.html":
            getPeopleData();
            break;
        case "/pages/person.html":
            getPersonData();
            break;
        case "/pages/all-locations.html":
            getLocationsData();
            break;
        case "/pages/location.html":
            getLocationData();
            break;
        case "/pages/all-services.html":
            getServicesData();
            break;
        case "/pages/service.html":
            getServiceData();
            break;
        case "/pages/contact-us.html":
            getLocationsData();
            break;
    }
}

startup();

