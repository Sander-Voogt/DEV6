var expect  = require("chai").expect;
var request = require("request");

describe("Game Test", function() {

    describe("Shop testing", function () {

        var url = "http://localhost:3000/game/shop";

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns weapons table", function (done) {
            request(url, function (error, response, body) {
                expect(body).to.contains("</table>");
                done();
            });
        });

    });

    describe("Show games page", function () {

        var url = "http://localhost:3000/games";

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns content", function () {
            request(url, function (error, response, body){
                expect(body).to.contains("<h1>The games</h1><p>Kies een spel dat je graag wilt spelen.</p>");
            });
        });
    });

    describe("Login", function () {
        var url = "http://localhost:3000";

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Should login", function(){
            request(url).post("/login").send(pa)
        })
    })

});

