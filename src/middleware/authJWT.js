// JsonWebToken
const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; //apra agarrar el bearer token
  let decoded = jwt.decode(token, { complete: true }); //decodificar el token de manera completa
  //si decoded token es null o esta mal next error OR si el usuario tiene admin en false: next error
  if (!decoded || decoded.payload.user.admin != true) {
    const error = new Error("UNAUTHORIZED(401)");
    error.status = 401;
    return next(error);
  } else {
    next();
  }
};

const checkLoggedUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; //apra agarrar el bearer token
  let decoded = jwt.decode(token, { complete: true }); //decodificar el token de manera completa
  //si decoded token es null o esta mal next error OR si el usuario tiene admin en false: next error
  if (!decoded) {
    const error = new Error("UNAUTHORIZED(401)");
    error.status = 401;
    return next(error);
  } else {
    req.user = decoded.payload.user
    next();
  }
};

module.exports = {
  checkAdmin,
  checkLoggedUser,
};
