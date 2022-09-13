//Brechas de seguridad & Programacion Defensiva
//Error_Unauthorized = 401
//Error_Not_Found = 404
//Error_Timeout = 408
//Conflict = (409)
//Error_Server 500
//Error_Service_Unavailable = 503

//En caso de haber algun error en los endpoints mostralo y continua
const errorLogger = (error, req, res, next) => {
  console.error(error);
  next(error);
};

//Segun los estados de error atrapar y mostrar el error
const errorParser = (error, req, res, next) => {
  if (error.status === 404) {
    //PODRIA REDIRRECCIONAR A UN ENDPOINT 404
    res.status(404).send("NOT FOUND (404)");
  } else if (error.status === 409) {
    res.status(409).send("- Conflict (409) Invalid Mail - ");
  } else if (error.errors.find((err) => err.type === "notNull Violation")) {
    //si en los errores(Objeto error) se obtiene(encuentra) un error de "notNull" entonces envia un 409
    res.status(409).send("- Conflict (409) Invalid Mail - ");
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
