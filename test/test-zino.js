var supertest = require('supertest');
var app = require('../app.js');
var agent = supertest.agent(app);
var expect  = require("chai").expect;