/**
 * Created by andre on 18-4-2017.
 */

var app = require('../app.js');
var expect  = require("chai").expect;

const Group = require('../routes/group.js');

describe("Test object Group", function() {
    let group = new Group(1, 'mygroup', 3, 1000);

    it('Create an instance with values', function() {
        group.f_id.should.equal(1);
    });
    it('set()', function() {
        group.members = 1;
        group.members.should.equal(1);
    });
    it('get()', function() {

    });
});