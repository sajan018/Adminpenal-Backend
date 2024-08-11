const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  productModel: {
    type: String,
    required: true,
  },
  productImageUrl: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  productColor:{
    type:String,
    required:true
  },
  productDescription: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model("product", productSchema);
