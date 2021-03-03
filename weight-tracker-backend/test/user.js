//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
   * Test GET /user
   */
  describe("GET /users", () => {
    it("it should GET all the users", async () => {
      res = await chai.request(server).get("/users");

      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.be.eql(0);
    });
  });

  /*
   * Test POST /user
   */
  describe("POST /user", () => {
    it("it should POST a user ", async () => {
      const username = "Mr. Beans";
      const password = "password123";
      let user = {
        username,
        password,
      };

      res = await chai.request(server).post("/users").send(user);

      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("User created!");
      res.body.should.have.property("user");
      res.body.user.should.have.property("_id");
      res.body.user.should.have.property("username").eql(username);
      res.body.user.should.not.have.property("password");
      res.body.user.should.have.property("weightEntries").eql([]);
      res.body.should.have.property("token");

      const decodedToken = jwt.verify(
        res.body.token,
        process.env.JWT_PRIVATE_KEY
      );

      decodedToken.should.have.property("_id").eql(res.body.user._id);

      const userInDb = await User.findById(res.body.user._id);
      userInDb.should.not.be.null;
      const isValidPassword = await bcrypt.compare(password, userInDb.password);
      isValidPassword.should.be.true;
    });
    it("it should not POST a user with a duplicate username", async () => {
      let username = "Mr. Beans";
      const password = "password123";
      let user = {
        username,
        password,
      };
      await chai.request(server).post("/users").send(user);

      res = await chai.request(server).post("/users").send(user);

      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Username already in use.");
    });
  });

  /*
   * Test POST /user/login
   */
  describe("POST /user/login", () => {
    it("it should login a user", async () => {
      const username = "Mr. Beans";
      const password = "password123";
      let user = {
        username,
        password,
      };

      // create the initial user so we can test loggin in after
      await chai.request(server).post("/users").send(user);

      res = await chai.request(server).post("/users/login").send(user);

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Login successful!");
      res.body.should.have.property("user");
      res.body.user.should.have.property("_id");
      res.body.user.should.have.property("username").eql(username);
      res.body.user.should.not.have.property("password");
      res.body.user.should.have.property("weightEntries").eql([]);
      res.body.should.have.property("token");
    });
    it("it should not login a user with an incorrect password", async () => {
      const username = "Mr. Beans";
      const password = "password123";
      let user = {
        username,
        password,
      };

      // create the initial user so we can test loggin in after
      await chai.request(server).post("/users").send(user);

      user.password = "IncorrectPassword";

      res = await chai.request(server).post("/users/login").send(user);

      res.should.have.status(403);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Password is incorrect.");
    });
    it("it should not login a non-existing user", async () => {
      const username = "Mr. Beans";
      const password = "password123";
      let user = {
        username,
        password,
      };

      // create the initial user so we can test loggin in after
      await chai.request(server).post("/users").send(user);

      user.username = "Angela Merkel";

      res = await chai.request(server).post("/users/login").send(user);

      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("User not found.");
    });
  });
});
