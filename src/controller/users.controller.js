const db = require("../models/index");
const { User } = db;

const getUsers = async (_req, res, next) => {
  await User.findAll() //RECORRE LAS TUPLAS DE LA TABLA Y CREA UN ARREGLO
    .then((findAll) => {
      res.status(200).send(findAll);
    })
    .catch((error) => next(error));
};

const addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
    });
    res.status(201).send(newUser);
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  getUsers,
  addUser,
};

module.exports = usersController;
