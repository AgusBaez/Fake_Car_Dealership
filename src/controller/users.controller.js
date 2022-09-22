const db = require("../models/index");
const { users, cars } = db;
const helper = require("../helper/checkUser");

const getUsers = async (_req, res, next) => {
  await users
    .findAll({ include: cars }) //RECORRE LAS TUPLAS DE LA TABLA Y CREA UN ARREGLO
    .then((findAll) => {
      if (findAll.length === 0) {
        res.status(400).send("Not Found any User");
      } else {
        res.status(201).send(findAll);
      }
    })
    .catch((error) => next(error));
};

const getUsersById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userFind = await users.findOne({
      include: cars,
      where: {
        id,
      },
    });
    if (userFind === null) {
      res.status(400).send("Not Found User");
    } else {
      res.status(201).send(userFind);
    }
  } catch (error) {
    return next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const incomingBody = req.body;
    //helper checkMail
    if (!helper.userMailValidator(req.body.email)) {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      return next(error);
    }

    const newUser = await users.create(incomingBody);
    res.status(201).send(newUser);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const incomingBody = req.body;

    if (!helper.userMailValidator(req.body.email)) {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      return next(error);
    }

    await users.update(incomingBody, {
      where: { id },
    });
    res.status(201).send(`Updated User ID: ${id}`);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    await users.destroy({
      where: { id },
    });
    res.status(202).send(`Deleted User ID: ${id}`);
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
};

module.exports = usersController;
