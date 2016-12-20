var expect  = require("chai").expect;
var request = require("request");

describe("Group test", function() {
    describe("Group showing", function() {
        describe("server request", function () {
            var url = "http://localhost:3000/game/groups";
                it("returns status 200", function (done) {
                    request(url, function (error, response, body) {
                        expect(response.statusCode).to.equal(200);
                        done();
                    });
            });
        });

        describe("Family table", function () {
            it("returns family table", function (done) {
                request(url, function (error, response, body) {
                    expect(body).to.contains("</table>");
                    done();
                });
             });

        });
    });

    describe("Group joining", function(){
        it('update the database on post', function(done) {
            chai.request(app)
                .send({f_id: '3'})
                .end(function(err, res) {
                    expect(res.f_id).to.equal("3");
                    done();
                });
        });
    });
});
