//traigo el modelo para generar consultas
import { Product } from "../model/Product.js";

const getProducts = async (_req, res) => {
  await Product.findAll() //RECORRE LAS TUPLAS DE LA TABLA Y CREA UN ARREGLO
    .then((findAll) => {
      res.status(200).send(findAll);
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const getProductId = async (req, res) => {
  const id = req.params.id;
  try {
    //de la documentacion de sequelize el metodo "findOne" // busca en la tabla donde coincida
    const productById = await Product.findOne({
      where: {
        id, //id: id,
      },
      attributes: ["name", "price", "description"], //"Proyecciones" los campos que quiero seleccionar en la consulta
    });

    // """""""middleware"""""""
    if (!productById)
      return res
        .status(404)
        .send({ message: "Product NOT FOUND. try another id" });

    res.status(200).send(productById);
  } catch (error) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const newProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body; //obtener datos del json
    const createProduct = await Product.create({
      //nuevo prototipo de objeto Producto // representa de la tabla sus filas en la DB
      name,
      price,
      description,
      categoryId,
      /*
      Forma NO RESUMIDA::
      name: name,
      price: price,
      description: description,
      */
    });
    //console.log("creating products...");
    res.status(201).send(createProduct);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id; //encuentro el user por id
    //metodo de squelize para modificar una tabla
    const getProduct = await Product.findOne({
      where: { id },
    });
    //Tomando todo lo del body y seteandolo con metodo de sequelize
    getProduct.set(req.body); //Toda la data que llegue ne l body si coincide con las tuplas lo setea
    //Una vez actualizado hay que guardalo con el metodo .save( ) de sequelize
    await getProduct.save();
    res.status(201).send(getProduct);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  //const {id} = req.param; //2° manera de obtener el parametro
  try {
    await Product.destroy({
      //obtiene como parametro un objeto para darle la opcion where
      where: {
        id,
      },
    }); //Metodo para buscar y eliminar
    res.status(204).send("removed product " + id);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const productsController = {
  getProducts,
  getProductId,
  newProduct,
  updateProduct,
  deleteProduct,
};

export default productsController;
