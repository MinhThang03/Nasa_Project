const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const request = require('supertest');

const planetsRouter = require('./router/planets/planets.router') ;
const launchesRouter = require('./router/launches/launches.router');


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(morgan('combined'));


app.use(express.json());
app.use(express.static(path.join(__dirname, '..' , 'public')));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//  Test GET planets
request(app)
  .get('/planets')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });



//  Test GET launches
request(app)
  .get('/launches')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });



//  Test POST launches
request(app)
    .post('/launches')
    .send({
            "mission": "ZTM155",
            "rocket": "ZTM Experimental IS1",
            "launchDate": 169148999999,
            "target": "Minh Thang"
        })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res) {
        if (err) throw err;
    });


//  Test DELETE launches
request(app)
    .delete(`/launches/${101}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
    });
 


module.exports = app;

