const db = require("../models/index");
const { users, cars } = db;
const helper = require("../helper/checkUser");
//node.bcrypt.js
const bcrypt = require("bcrypt");
//jsonwebtoken
let jwt = require("jsonwebtoken");
//VALORES DE ENTORNO
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, admin } = req.body;
    //helper checkMail
    if (!helper.userMailValidator(req.body.email)) {
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
        admin
      })
      .then((newUser) => {
        if (newUser.length === 0) {
          res.status(400).send({ ok: false, message: "Invalid data" });
        } else {
          res.status(201).send({ ok: true, message: "Register New User" });
        }
      })
      .catch((error) => next(error));
    //res.status(201).send({ok: true});
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const bodyData = req.body;
    //helper checkMail & check password
    if (
      typeof bodyData.password != typeof "string" ||
      !helper.userMailValidator(bodyData.email)
    ) {
      const error = new Error("CONFLICT(409)");
      error.status = 409;
      return next(error);
    }

    //buscame el usuario en la DB
    const loginUser = await users.findOne({ where: { email: bodyData.email } });
    //En el caso que se encuentre el usuario:
    if (loginUser != null) {
      //Caso que la constraseña no sea igual
      if (
        typeof bodyData.password != typeof "string" ||
        loginUser.password === null ||
        !bcrypt.compareSync(bodyData.password, loginUser.password)
      ) {
        const error = new Error("FAIL LOGIN(400)");
        error.status = 400;
        return next(error);
      }
      //jwt.sign(payload, secretOrPrivateKey, [options, callback]) //https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
      let token = jwt.sign(
        {
          user: loginUser,
        },
        process.env.SEED_AUTHENTICATION,
        { expiresIn: process.env.TOKEN_EXP }
      );
      res.status(201).json({ ok: true, user: loginUser, token: token }); //Datos codificados no se cargan en el payload del token
    } else {
      const error = new Error("CONFLICT(409)");
      error.status = 409;
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  register,
  login,
};

module.exports = usersController;
