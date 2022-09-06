const { Category } = require("../model/Category.js");
const { Product } = require("../model/Product.js");

const getCategories = async (req, res) => {
  try {
    //Espero a que encuentre los datos del modelo
    const findCategories = await Category.findAll(); //arreglo de datos en las duplas del modelo

    if (findCategories.length === 0)
      res.status(404).send("NOT FOUND CATEGORIES IS EMPTY");

    res.status(200).send(findCategories);
  } catch (e) {
    return res.status(500).send({ mesage: e.mesage });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, stock, description } = req.body;
    const newCategory = await Category.create({
      name,
      stock,
      description,
    });
    res.status(201).send(newCategory);
  } catch (error) {
    return res.status(500).send("Unknow Server Error");
  }
};

const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    //de la documentacion de sequelize el metodo "findOne" // busca en la tabla donde coincida
    const categoryById = await Category.findOne({
      where: {
        id,
        //id: id,
      },
    });

    // """""""middleware"""""""
    if (!categoryById)
      return res
        .status(404)
        .send({ message: "category NOT FOUND. try another id" });

    res.status(200).send(categoryById);
  } catch (error) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id; //encuentro el user por id
  const { name, stock, description } = req.body; //obtengo sus datos y sus posibles modificaciones
  try {
    // await Product.findOne({
    //   where: {
    //     id
    //   }
    // })
    //metodo de squelize para modificar una tabla
    const getCategory = await Category.findByPk(id);
    getCategory.name = name;
    getCategory.stock = stock;
    getCategory.description = description;

    //Una vez actualizado hay que guardalo con el metodo .save( ) de sequelize
    await getCategory.save();
    res.status(200).send(getCategory);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  //const {id} = req.param;
  try {
    await Category.destroy({
      //obtiene como parametro un objeto para darle la opcion where
      where: {
        id,
      },
    }); //Metodo para buscar y eliminar
    res.status(204).send("removed Category " + id);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const productByCategoryId = await Product.findAll({
      //findAll devuelve los datos en arreglos
      where: {
        categoryId: id,
      },
    });
    res.status(200).send(productByCategoryId);
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const productsController = {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
};

module.exports = productsController;
