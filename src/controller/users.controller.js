const db = require("../models/index");
const { users, cars } = db;
const helper = require("../helper/checkUser");
const bcrypt = require("bcrypt");

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

const getUserById = async (req, res, next) => {
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
    const { firstName, lastName, email, password, admin } = req.body;
    //helper checkMail
    if (
      typeof req.body.password != typeof "string" ||
      !helper.userMailValidator(req.body.email)
    ) {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      return next(error);
    }

    await users
      .create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        admin,
      })
      .then((newUser) => {
        if (newUser.length === 0) {
          res.status(400).send({ ok: false, message: "Invalid data" });
        } else {
          res.status(201).send({ ok: true, message: "Register New User" });
        }
      });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, password, admin } = req.body;

    if (typeof req.body.password != typeof "string") {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      return next(error);
    }

    if (req.body.email) {
      if (!req.body.email || !helper.userMailValidator(req.body.email)) {
        const error = new Error(" CONFLICT MAIL (409)");
        error.status = 409;
        return next(error);
      }
    }

    await users.update(
      {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        admin,
      },
      {
        //> ENCRYPTAR CONTRASEÑAA
        where: { id },
      }
    );
    res.status(201).send({ ok: true, message: "Update User" });
  } catch (error) {
    return next(error);
  }
};

const editUserLogged = async (req, res, next) => {
  try {
    let id = req.user.id;
    const { firstName, lastName, email, password, admin } = req.body;

    if (req.body.password) {
      if (typeof req.body.password != typeof "string") {
        const error = new Error(" CONFLICT MAIL (409)");
        error.status = 409;
        return next(error);
      }
    }

    if (req.body.email) {
      if (!req.body.email || !helper.userMailValidator(req.body.email)) {
        const error = new Error(" CONFLICT MAIL (409)");
        error.status = 409;
        return next(error);
      } else if (req.body.password) {
        await users.update(
          {
            password: bcrypt.hashSync(password, 10),
          },
          {
            //> ENCRYPTAR CONTRASEÑAA
            where: { id },
          }
        );
      }
    }

    await users.update(
      {
        firstName,
        lastName,
        email,
        admin,
      },
      {
        //> ENCRYPTAR CONTRASEÑAA
        where: { id },
      }
    );
    res.status(201).send({ ok: true, message: "Update User" });
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
    res.status(202).send({ ok: true, message: "Deleted User" });
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  editUserLogged,
  deleteUser,
};

module.exports = usersController;
