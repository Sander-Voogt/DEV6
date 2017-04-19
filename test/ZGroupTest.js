"use strict";

const Group = require('../routes/group.js');

describe("Test Group Object", function() {
    let group = new Group(1, 'mygroup', 3, 1000);
    var app;
    var expect;

    beforeEach(function () {
        app = require('../app.js');
        expect  = require("chai").expect;
    });

    it('getF_id()', function() {
        expect(group.f_id).to.equal(1);
    });

    it('getName()', function() {
        expect(group.name).to.equal('mygroup');
    });

    it('getMembers()', function() {
        expect(group.members).to.equal(3);
    });

    it('getMoney()', function() {
        expect(group.money).to.equal(1000);
    });

    it('setF_id()', function() {
        group.f_id = 5;
        expect(group.f_id).to.equal(5);
    });

    it('setName()', function() {
        group.name = 'AndreHummel';
        expect(group.name).to.equal('AndreHummel');
    });

    it('setMembers()', function() {
        group.members = 1;
        expect(group.members).to.equal(1);
    });

    it('setMoney()', function() {
        group.money = 1000;
        expect(group.money).to.equal(1000);
    });
});