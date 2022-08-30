//VIDEO PRACTICO: - https://www.youtube.com/watch?v=aIHQsAjRLYU
// DOCUMENTACION: - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date

//Methodos del date;
//console.log(Date());// Prototipo de una funcion en codigo nativo
//console.log(date.getDate(), date.getDay(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds, date.getMilliseconds);
//console.log(date.toString());
//console.log(date.toDateString());
//console.log(date.getTimezoneOffset); Uso horario del pais
//console.log(date.toUTCString());//
//console.log(Date.now());//TimeStamp, cuantos segundos pasaron desde 1° de enero de 1970

//LIBRERIA: MOMENT.js - para el menejo del tiempo

export function dateToDay(req, res, next) {
  try {
    let date = new Date();
    return (
      console.log(
        `new Request - ${req.method} - On ${date.toLocaleDateString()}`
      ),
      next()
    );
  } catch (error) {
    return res.status(400).send({ mesage: error.mesage });
  }
}
