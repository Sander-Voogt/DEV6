var supertest = require('supertest');
var app = require('../app.js');
var agent = supertest.agent(app);
var expect  = require("chai").expect;

describe('Tests Zino: Roulette en Leaderboard', function () {

    describe("Testing van een sort bet", function() {

        it('inloggen en cookie registeren', function(done) {
            agent
                .post('/login')
                .type('form')
                .send({username: 'Dion'})
                .send({password: 'hoi'})
                .expect(302)
                .expect('Location', '/')
                .expect('set-cookie', /username/)
                .end(function(err, res) {
                    agent.jar.setCookie(res.headers['set-cookie'][0]);
                    console.log("\nCookies: " + res.headers['set-cookie'] + "\n");
                    return done();
                });

        it('gokken', function(done) {
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

                });
        });
    });
});}