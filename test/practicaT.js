var assert = require("assert");
const request = require("supertest");
const Sinon = require("sinon");
const carsController = require("../src/controller/cars.controller");
const app = require("../src/app");

//PRUEBA
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe.only("Get /users", () => {
  it("Check Status", (done) => {
    request(app).get("/users").expect(200).end(done);
  });
});

//Test add New Car
describe("POST /cars", () => {
  it("Fijate si funciona", (done) => {
    Sinon.stub(carsController, "addCar").returns({
      brand: "Mercedez",
      maxSpeed: 200,
    });
    request(app).post("/cars");
  });
});
