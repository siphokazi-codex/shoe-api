
const mongoose = require('mongoose');
module.exports = function(mongoURL){
  mongoose.Promise = global.Promise;

  mongoose.connection.on("error", function(err){
    console.log(err);
  })

  mongoose.connect(mongoURL);

  const shoesSchema = mongoose.Schema(
    {
      brand : String,
      price: Number,
      color: String,
      size: Number,
      in_stock: Number,
      shoe_image: String
    });

   shoesSchema.index({brand : 1}, { unique : true});

   const Shoes = mongoose.model('Shoes', shoesSchema);


  return{
    Shoes
  };
}
