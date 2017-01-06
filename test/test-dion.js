var supertest = require('supertest');
var app = require('../app.js');
var agent = supertest.agent(app);
var expect  = require("chai").expect;

describe('Tests Dion: winkel en inventaris', function () {

    describe("Testing van functies", function() {
        it('controleren of aankoop mogelijk is', function(done) {
            var file = require("../routes/game/shop");
            var test1  = file.checkPurchase(1000, 3000, 20);
            expect(test1).to.equal(1, done());

        });
    });

    describe("Testing i.c.m. cookies & database", function() {

        it('inloggen en cookie registeren', function(done) {
            agent
                .post('/login')
                .type('form')
                .send({username: 'TestDion'})
                .send({password: '123'})
                .expect(302)
                .expect('Location', '/')
                .expect('set-cookie', /username/)
                .end(function(err, res) {
                    agent.jar.setCookie(res.headers['set-cookie'][0])
                    console.log("\nCookies: " + res.headers['set-cookie'] + "\n");
                    return done();
                });
        });

        it("wapenwinkel openen, geld aflezen", function (done){
            agent
                .get('/game/shop')
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

        it("wapen aanschaffen", function (done){
            agent
                .get('/game/shop/M9')
                .expect(302, done);
        });

        it("inventaris controleren of wapen in bezit is", function (done){
            agent
                .get('/game/inventory')
                .expect(200)
                .then(function (res) {
                    expect(res.text).to.contains("<td>M9</td>");
                    return done();
                })
                .catch(function (err) {
                    console.log(err.response.text);
                    return
                });
        });
    });
});