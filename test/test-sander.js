var supertest = require('supertest');
var app = require('../app.js');
var agent = supertest.agent(app);
var expect  = require("chai").expect;

describe('Tests Sander: misdaden en auto stelen', function () {

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
                agent.jar.setCookie(res.headers['set-cookie'][0])
                console.log("\nCookies: " + res.headers['set-cookie'] + "\n");
                return done();
            });
    });

    describe("Testen misdaad speler", function() {

        it("pleeg misdaad", function(done){

            agent
                .post('/game/crime')
                .type('form')
                .send({chance: '100'})
                .expect(200)
                .then(function (res) {
                    expect(res.text).to.contains("<h3>Je hebt 1000 euro verdient</h3>");
                    return done();
                })
                .catch(function (err){
                    console.log(err.response.text);
                    return
                })
        });

        it('Misdaad correct', function(done) {
            var file = require("../routes/game/crimes");
            var test1  = file.doCrime(100);
            expect(test1).to.equal(100.00009999999999, done());
        });

        it('kans gaat minder niet hoger dan 90%', function (done){
            var file = require("../routes/game/crimes");
            var test1  = file.doCrime(90);
            expect(test1).to.equal(90.00008999999999, done());
        });

        it('Misdaad fout', function(done) {
            var file = require("../routes/game/crimes");
            var test1  = file.doCrime(0);
            expect(test1).to.equal(0, done());
        });
    });

    describe("Testen auto stelen speler", function() {

        it("steel auto", function(done){
            agent
                .post('/game/car')
                .type('form')
                .send({chance: '100'})
                .expect(200)
                .then(function (res) {
                    expect(res.text).to.contains("<h3>Je hebt een auto gejat</h3>");
                    return done();
                })
                .catch(function (err){
                    console.log(err.response.text);
                    return
                })
        });

        it("garage controleren of auto in garage staat", function (done){
            agent
                .get('/garage')
                .expect(200)
                .then(function (res) {
                    expect(res.text).to.contains("<td>");
                    return done();
                })
                .catch(function (err) {
                    console.log(err.response.text);
                    return
                });
        });

        it('kans gaat minder niet hoger dan 90%', function (done){
            var file = require("../routes/game/cars");
            var test1  = file.doCrime(90);
            expect(test1).to.equal(90.00000000009001, done());
        });

        it('Auto stelen correct', function(done) {
            var file = require("../routes/game/cars");
            var test1  = file.doCrime(100);
            expect(test1).to.equal(100.00000000010002, done());
        });

        it('Auto stelen fout', function(done) {
            var file = require("../routes/game/cars");
            var test1  = file.doCrime(0);
            expect(test1).to.equal(0, done());
        });
    });
});