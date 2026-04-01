require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const ProductDAO = {

  // =====================
  // ADMIN FUNCTIONS
  // =====================

  // GET ALL
  async selectAll() {
    return await Models.Product
      .find({})
      .populate('categories_id')
      .exec();
  },

  // INSERT
  async insert(product) {

    product._id = new mongoose.Types.ObjectId();
    product.show = true;

    if (product.categories_id) {
      if (!Array.isArray(product.categories_id)) {
        product.categories_id = [product.categories_id];
      }

      product.categories_id = product.categories_id.map(
        id => new mongoose.Types.ObjectId(id)
      );
    }

    if (product.image) {
      product.images = [`uploads/${product.image.filename}`];
    }

    return await Models.Product.create(product);
  },

  // UPDATE
  async update(product) {

    if (!mongoose.Types.ObjectId.isValid(product._id)) return null;

    const newvalues = {
      name: product.name,
      price: product.price,
      show: product.show
    };

    if (product.images) newvalues.images = product.images;

    if (product.categories_id && product.categories_id.length > 0) {
      newvalues.categories_id = product.categories_id.map(
        id => new mongoose.Types.ObjectId(id)
      );
    }

    return await Models.Product.findByIdAndUpdate(
      product._id,
      newvalues,
      { new: true }
    );
  },

  // DELETE
  async delete(_id) {

    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    return await Models.Product.findByIdAndDelete(_id);
  },


  // =====================
  // CUSTOMER FUNCTIONS
  // =====================

  // SELECT PRODUCT BY ID
  async selectByID(_id) {

    if (!mongoose.Types.ObjectId.isValid(_id)) return null;

    return await Models.Product
      .findById(_id)
      .populate('categories_id') // QUAN TRỌNG để lấy tên category
      .exec();
  },


  // =====================
  // NEW PRODUCTS
  // =====================
  async selectTopNew(top) {

    const mysort = { _id: -1 };

    return await Models.Product
      .find({ show: true })
      .sort(mysort)
      .limit(top)
      .exec();
  },


  // =====================
  // HOT PRODUCTS
  // =====================
  async selectTopHot(top) {

    const mysort = { price: -1 };

    return await Models.Product
      .find({ show: true })
      .sort(mysort)
      .limit(top)
      .exec();
  },


  // =====================
  // PRODUCTS BY CATEGORY
  // =====================
  async selectByCatID(cid) {

    if (!mongoose.Types.ObjectId.isValid(cid)) return [];

    return await Models.Product
      .find({
        categories_id: new mongoose.Types.ObjectId(cid),
        show: true
      })
      .populate('categories_id')
      .exec();
  },


  // =====================
  // SEARCH PRODUCT
  // =====================
  async selectByKeyword(keyword) {

    const query = {
      name: { $regex: new RegExp(keyword, "i") },
      show: true
    };

    return await Models.Product
      .find(query)
      .populate('categories_id')
      .exec();
  }

};

module.exports = ProductDAO;