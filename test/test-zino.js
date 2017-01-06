var supertest = require('supertest');
var app = require('../app.js');
var agent = supertest.agent(app);
var expect  = require("chai").expect;

describe('Tests Zino: Roulette en Leaderboard', function () {

    describe("Testing van een sort bet", function() {

        it('inloggen en cookie registeren', function(done) {
            agent
                .post('/game/roulette')
                .type('form')
                .send({select: 'odd'})
                .send({amount: '12'})
                .expect(200)
                .expect('Location', '/')
        });

        it("roulette openen, geld aflezen", function (done){
            agent
                .get('/game/roulette')
                .expect(200)
                .then(function (res) {
                    expect(res.text).to.contains("Jouw geld:");
                    return done();
                })
                .catch(function (err) {
                    console.log(err.response.text);
                    return
                });
        });


        it("kijken of button op znplaats is", function (done){
            agent
                .get('/game/roulette')
                .expect(200)
                .then(function (res) {
                    expect(res.text).to.contains("Gok");
                    return done();
                })
                .catch(function (err) {
                    console.log(err.response.text);
                    return
                });
        });
    });
});