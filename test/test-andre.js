var expect  = require("chai").expect;
var request = require("request");
var supertest = require('supertest');
var app = require('../app.js');
var agent = supertest.agent(app);

describe("Testen met database", function() {

    it('inloggen en cookie registeren', function(done) {
        agent
            .post('/login')
            .type('form')
            .send({username: '12345'})
            .send({password: '12345'})
            .expect(302)
            .expect('Location', '/')
            .expect('set-cookie', /username/)
            .end(function(err, res) {
                agent.jar.setCookie(res.headers['set-cookie'][0])
                console.log("\nCookies: " + res.headers['set-cookie'] + "\n");
                return done();
            });
    });

    it("groepen tonen", function (done){
        agent
            .get('/game/groupjoin')
            .expect(200)
            .then(function (res) {
                expect(res.text).to.contains("Group management");
                return done();
            })
            .catch(function (err) {
                console.log(err.response.text);
                return done();
            });
    });

    it("group info tonen", function (done){
        agent
            .get('/game/groupinfo')
            .expect(200, done)
            .then(function (res) {
                expect(res.text).to.contains("My Group");
                return done();
             })
            .catch(function (err) {
                console.log(err.response.text);
                return done();
            });
    });

});
