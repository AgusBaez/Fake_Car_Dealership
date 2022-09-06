const db = require("../models/index");
const { User } = db;

const getUsers = async (_req, res) => {
  await User.findAll() //RECORRE LAS TUPLAS DE LA TABLA Y CREA UN ARREGLO
    .then((findAll) => {
      res.status(200).send(findAll);
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
    });
    res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send("Unknow Server Error");
  }
};

const usersController = {
  getUsers,
  addUser,
};

module.exports = usersController;
