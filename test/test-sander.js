/**
 * Created by Sander on 06-01-17.
 */
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

    describe("Test misdaden", function(){
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
    });

    describe("Testen misdaad speler", function() {

        it('Misdaad correct', function(done) {
            var file = require("../routes/game/crimes");
            var test1  = file.doCrime(100);
            expect(test1).to.equal(108, done());
        });

        it('Misdaad fout', function(done) {
            var file = require("../routes/game/crimes");
            var test1  = file.doCrime(0);
            expect(test1).to.equal(0, done());
        });
    });
});