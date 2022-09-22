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
    const { firstName, lastName, email, password } = req.body;
    //helper checkMail
    if (!helper.userMailValidator(req.body.email)) {
      const error = new Error(" CONFLICT MAIL (409)");
      error.status = 409;
      return next(error);
    }

    const newUser = await users.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).send(newUser);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const bodyData = req.body;
    //helper checkMail
    if (
      typeof bodyData.password != typeof "string" ||
      !helper.userMailValidator(req.body.email)
    ) {
      const error = new Error(" CONFLICT(409)");
      error.status = 409;
      return next(error);
    }

    //buscame el usuario en la DB
    const loginUser = await users.findOne({ where: { email: bodyData.email } });
    //Caso que la constraseña no sea igual
    if (!bcrypt.compareSync(bodyData.password, loginUser.password)) {
      const error = new Error(" Unautorized (401)");
      error.status = 401;
      return next(error);
    }
    //jwt.sign(payload, secretOrPrivateKey, [options, callback]) //https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
    let token = jwt.sign(
      {
        usuario: loginUser,
      },
      process.env.KEY_JWT,
      { expiresIn: process.env.TOKEN_EXP }
    );
    res.status(201).json({ ok: true, usuario: loginUser, token: token });
  } catch (error) {
    return next(error);
  }
};

const usersController = {
  register,
  login,
};

module.exports = usersController;
