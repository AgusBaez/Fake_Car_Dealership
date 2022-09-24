// JsonWebToken
const jwt = require("jsonwebtoken");

const userMailValidator = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const checkLoggedIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; //apra agarrar el bearer token
  let decoded = jwt.decode(token, { complete: true }); //decodificar el token de manera completa
  //si decoded token es null o esta mal next error OR si el usuario tiene admin en false: next error
  if (!decoded) {
    const error = new Error("UNAUTHORIZED(401)");
    error.status = 401;
    return next(error);
  } else {
    next();
  }
};

module.exports = {
  userMailValidator,
  checkLoggedIn,
};

//match devuelve null si no se cumple la concicion, si cumple devuelve TRUE
