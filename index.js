const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlDbFactory = require('knex');
const process = require('process');
const _ = require('lodash');

let myPort = process.env.PORT || 7000;
let sqlDb;

function initSqlDB() {
    sqlDb = sqlDbFactory({
        client: "sqlite3",
        debug: true,
        connection: {
            filename: "./db.sqlite"
        },
        useNullAsDefault: true
    });
}

function ensurePopulated() {
    return (sqlDb.schema.hasTable("people") && sqlDb.schema.hasTable("locations") && sqlDb.schema.hasTable("services")).then(function (exists) {
        if (!exists) {
            //creates a table for 'people'
            sqlDb.schema.createTable("people", function (table) {
                table.increments("id").primary();
                table.string("name");
                table.string("surname");
                table.string("profession");
                table.integer("tel").unsigned();
                table.string("mail");
                table.string("cv");
                table.string("picture");
                table.integer("serviceId").unsigned();
            })
            .then(function() {
                let insertions = _.map(peopleList, p => {
                    delete p.id;
                    return sqlDb("people").insert(p);
                });
                return Promise.all(insertions);
            });
            
            //creates a table for 'locations'
            sqlDb.schema.createTable("locations", function (table) {
                table.increments("id").primary();
                table.string("name");
                table.string("city");
                table.string("address");
                table.string("information");
                table.integer("tel").unsigned();
                table.string("picture");
                table.string("map");
            })
            .then(function() {
                let insertions = _.map(locationsList, l => {
                    delete l.id;
                    return sqlDb("locations").insert(l);
                });
                return Promise.all(insertions);
            });

            //creates a table for 'services'
            sqlDb.schema.createTable("services", function (table) {
                table.increments("id").primary();
                table.string("name");
                table.string("description");
                table.string("goals");
                table.integer("locationId").unsigned;
            })
            .then(function() {
                let insertions = _.map(servicesList, s => {
                    delete s.id;
                    return sqlDb("services").insert(s);
                });
                return Promise.all(insertions);
            });
        } else {
            return true;
        }
    });
}

let peopleList = require('./peopledata.json');
let locationsList = require('./locationsdata.json');
let servicesList = require('./servicesdata.json');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/people", function(req, res) {
    let myQuery = sqlDb('people');
    myQuery
        .select('id', 'name', 'surname', 'profession', 'picture')
        .from('people')
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/people/:id", function(req, res) {
    let personId = parseInt(req.params.id);
    sqlDb
        .select(
            'p.name', 'p.surname', 'p.profession', 'p.tel', 'p.mail', 'p.cv', 'p.picture', 'p.serviceId',
            's.name AS serviceName'
        )
        .from('people AS p')
        .leftJoin('services AS s', 'p.serviceId', 's.id')
        .where('p.id', personId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/locations", function(req, res) {
    let myQuery = sqlDb('locations');
    myQuery
        .select('id', 'name', 'city', 'address', 'tel', 'picture')
        .table('locations')
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/locations/:id", function(req, res) {
    let locationId = parseInt(req.params.id);
    sqlDb
        .select(
            'l.name', 'l.city', 'l.address', 'l.information', 'l.picture', 'l.tel', 'l.map',
            's.id AS serviceId', 's.name AS serviceName'
        )
        .from('locations AS l')
        .leftJoin('services AS s', 's.locationId', 'l.id')
        .where('l.id', locationId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/services", function(req, res) {
    let myQuery = sqlDb('services');
    myQuery
        .select(
            's.id', 's.name', 's.locationId',
            'l.name AS locationName'
        )
        .from('services AS s')
        .leftJoin('locations AS l', 'l.id', 's.locationId')
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.get("/services/:id", function(req, res) {
    let serviceId = parseInt(req.params.id);
    sqlDb
        .select(
            's.name', 's.description', 's.goals', 's.locationId',
            'p.id AS personId', 'p.name AS personName', 'p.surname AS personSurname',
            'l.name AS locationName'
        )
        .from('services AS s')
        .leftJoin('people AS p', 'p.serviceId', 's.id')
        .leftJoin('locations AS l', 'l.id', 's.locationId')
        .where('s.id', serviceId)
        .then(result => {
            res.send(JSON.stringify(result));
        });
});

app.set("port", myPort);

initSqlDB();
ensurePopulated().then(function () {
    //run the server
    app.listen(myPort, function() {
        console.log('Your app is ready at port %s, try localhost:%s', myPort, myPort);
    });
});