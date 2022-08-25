//traigo el modelo para generar consultas
import { Product } from "../model/Product.js";

const getProducts = async (_req, res) => {
  try {
    const allProducts = await Product.findAll(); //RECORRE LAS FILAS DE LA TABLA Y CREA UN ARREGLO
    res.status(200).send(allProducts);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const getProductId = async (req, res) => {
  const id = req.params.id;
  try {
    //de la documentacion de sequelize el metodo "findOne" // busca en la tabla donde coincida
    const productById = await Product.findOne({
      where: {
        id,
        //id: id,
      },
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
  //console.log(req.body);
  const { name, price, description } = req.body; //obtener datos del json

  try {
    const createProduct = await Product.create({
      //nuevo prototipo de objeto Producto // representa de la tabla sus filas en la DB
      name,
      price,
      description,
      /*
      Forma NO RESUMIDA::
      name: name,
      price: price,
      description: description,
      */
    });
    //console.log("creating products...");
    res.status(200).send(createProduct);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id; //encuentro el user por id
  const { name, price, description } = req.body; //obtengo sus datos y sus posibles modificaciones
  try {
    // await Product.findOne({
    //   where: {
    //     id
    //   }
    // })
    //metodo de squelize para modificar una tabla
    const getProduct = await Product.findByPk(id);
    getProduct.name = name;
    getProduct.price = price;
    getProduct.description = description;

    //Una vez actualizado hay que guardalo con el metodo .save( ) de sequelize
    await getProduct.save();
    res.status(200).send(getProduct);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  //const {id} = req.param;
  try {
    await Product.destroy({
      //obtiene como parametro un objeto para darle la opcion where
      where: {
        id,
      },
    }); //Metodo para buscar y eliminar
    res.status(200).send("removed product " + id);
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
