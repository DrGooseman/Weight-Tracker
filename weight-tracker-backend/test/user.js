//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Users", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST user", () => {
    it("it should POST a user ", (done) => {
      let username = "Mr. Beans";
      let user = {
        username,
      };
      chai
        .request(server)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("User created!");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("username").eql(username);
          res.body.user.should.have.property("weightEntries").eql([]);
          done();
        });
    });
  });
});
