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
});

