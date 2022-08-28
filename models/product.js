const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },

    serie: {
      type: Number,
      required: true,
      unique: true
    },
  
    prix: {
      type: Number,
      required: true,
    },


    cat: {
      type: String,
      required: true,
    },
    
    picture: {
      type: String,
      required: true,
    },
})

const Product = mongoose.model("product", productSchema)

module.exports = Product