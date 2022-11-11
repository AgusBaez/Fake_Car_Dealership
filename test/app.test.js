const { app, server } = require("../src/index");
const appUser = require("../src/routes/users.routes");
//Modulo de node para testing de un BACK END restAPI
const request = require("supertest");
//comparaciones y condiciones de aprobacion
const chai = require("chai");
const assert = require("chai").assert;
const expect = chai.expect;
const db = require("../src/models/index");

beforeEach(() => {
  //borra los datos de la DB
  db.sequelize.truncate({ cascade: true });
});

//agrupacion de test con describe
describe("GET /users", () => {
  it("check status 200", (done) => {
    request(appUser).get("/users").expect(200).end(done);
  });

  it("check theres only one user", (done) => {
    request(appUser)
      .post("/user")
      .send({
        firstName: "Juanito",
        lastName: "test2",
        email: "juanito@gmail.com",
        password: "123",
        admin: true,
      })
      .set("Accept", "application/json")
      .then((user) => {
        request(appUser)
          .get("/users")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            assert.lengthOf(res.body, 1);
            done();
          });
      })
      .catch((err) => done());
  });
});

// describe("POST /user", () => {
//   it("check status 201", (done) => {
//     request(app)
//       .post("/users")
//       .send({
//         firstName: "Juanito",
//         lastName: "test2",
//         email: "juanito@gmail.com",
//         password: "123",
//         admin: true,
//       })
//       .set("Accept", "application/json")
//       .expect(201)
//       .end(done);
//   });
// });

// describe("GET /cars", () => {
//   beforeEach(async () => {
//     let user = db.users.build({
//       email: "test@gmail.com",
//       password: "asdasd",
//       lastName: "Name",
//       firstName: "Juanito",
//       admin: true,
//     });
//     await user.save();
//     await db.cars.create({
//       brand: "Mercedes Benz",
//       speed: 1999.0,
//       userId: user.id,
//     });
//   });

//   it("will test cars", (done) => {
//     request(app)
//       .get("/cars")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then((res) => {
//         assert.lengthOf(res.body, 1);
//         done();
//       });
//   });
// });
