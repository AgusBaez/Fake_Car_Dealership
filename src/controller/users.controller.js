const db = require("../models/index");
const { User } = db;
const helper = require("../helper/checkUser");

const getUsers = async (_req, res, next) => {
  await User.findAll() //RECORRE LAS TUPLAS DE LA TABLA Y CREA UN ARREGLO
    .then((findAll) => {
      res.status(200).send(findAll);
    })
    .catch((error) => next(error));
};

const getUsersById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userFind = await User.findOne({
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
    const { firstName, lastName, email } = req.body;
    //helper checkMail
    if (!helper.userMailValidator(req.body.email)) {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      next(error);
    }

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

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const incomingBody = req.body;

    if (!helper.userMailValidator(req.body.email)) {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      next(error);
    }
    
    await User.update(incomingBody, {
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

    await User.destroy({
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
