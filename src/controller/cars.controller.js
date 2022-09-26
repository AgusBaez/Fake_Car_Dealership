const db = require("../models/index");
const { users, cars } = db;

const getCars = async (_req, res, next) => {
  await cars
    .findAll({ include: users }) //RECORRE LAS TUPLAS DE LA TABLA Y CREA UN ARREGLO
    .then((findAll) => {
      if (findAll.length === 0) {
        res.status(400).send("No car found");
      } else {
        res.status(201).send(findAll);
      }
    })
    .catch((error) => next(error));
};

const getCarsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carFind = await cars.findOne({
      include: users,
      where: {
        id,
      },
    });
    if (carFind === null) {
      res.status(400).send("Not Found any car");
    } else {
      res.status(201).send(carFind);
    }
  } catch (error) {
    return next(error);
  }
};

const addCar = async (req, res, next) => {
  try {
    const { brand, speed, user_id } = req.body;

    const newCar = await cars.create({
      brand,
      speed,
      user_id,
    });
    res.status(201).send(newCar);
  } catch (error) {
    return next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const incomingBody = req.body;

    await cars.update(incomingBody, {
      where: { id },
    });
    res.status(201).send(`Updated Car ID: ${id}`);
  } catch (error) {
    return next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const id = req.params.id;

    await cars.destroy({
      where: { id },
    });
    res.status(202).send(`Deleted Car ID: ${id}`);
  } catch (error) {
    return next(error);
  }
};

const editCarLogged = async (req, res, next) => {
  try {
    let id = req.user.id; //Lo saco del token
    const { brand, speed, user_id } = req.body;

    await cars.update({ brand, speed, user_id }, { where: { id } });

    res.status(201).send({ ok: true, message: "Update Car" });
  } catch (error) {
    return next(error);
  }
};

const carsController = {
  getCars,
  getCarsById,
  addCar,
  updateCar,
  deleteCar,
  editCarLogged,
};

module.exports = carsController;
