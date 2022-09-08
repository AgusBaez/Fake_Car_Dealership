//Brechas de seguridad & Programacion Defensiva
//Error_Unauthorized = 401 - unauthorized
//Error_Not_Found = 404
//Error_Timeout = 408
//Error_Server 500
//Error_Service_Unavailable = 503
const errorLogger = (error, req, res, next) => {
  console.error(error);
  next(error);
};

const errorParser = (error, req, res, next) => {
  if (error.status === 404) {
    //PODRIA REDIRRECCIONAR A UN ENDPOINT 404
    res.status(404).send("NOT FOUND (404)");
  } else if (error.errors.find((err) => err.type === "notNull Violation")) {//si en los errores(Objeto error) se obtiene(encuentra) un error de "notNull" entonces envia un 400
    res.status(400).send("- Bad Request (400) -");
  } else {
    res.status(500).send("- Server Error -");
  }
};

const notFound = (_req, _res, next) => {
  const error = new Error("Not Found (404)");
  error.status = 404;
  return next(error);
};

let errorHandler = {
  errorLogger,
  errorParser,
  notFound,
};

module.exports = errorHandler;
