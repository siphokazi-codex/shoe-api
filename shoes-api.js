module.exports = function(models) {

  const addShoes = function(req, res, next){

     var brand = req.body.brand
     var price = req.body.price
     var color = req.body.color
     var size = req.body.size
     var in_stock = req.body.in_stock

     models.Shoes.findOne({brand: brand, color: color, price: price, size: size, in_stock: in_stock}, function(err, findResults){
       if (err){
         return next(err)
       }
       else if (findResults){
         models.Shoes.update({brand: brand, color: color, price: price, size: size, in_stock: in_stock},
           { $set: { brand: brand, color: color, price: price, size: size, in_stock: in_stock} }, function(err, Updateresults){

           })
       }
       else {
         models.Shoes.create(req.body, function(err, addShoesResults){
           res.json(addShoesResults);
         })
         //res.json(addShoesResults);
       }

     })


  //     models.Shoes.create(req.body, function(err, addShoesResults){
  //     if (err){
  //       if (err.code === 11000) {
  //          res.json({response: "You have inputed this shoe: brand, price, color, size before, please input different type of shoe number"});
  //        }
  //        else {
  //          console.log(req.body)
  //         return next(err);
  //       }
  //   }
  //     else {
  //       res.json(addShoesResults);
  //     }
  // })
}

  const getShoes = function(req, res, next) {

    models.Shoes.find({}, function(err, shoesResults){
      if (err){

        return next(err);
      }
      else {
        res.json(shoesResults);
      }

    })

  }

  const checkBrand = function(req, res, next){

    var brand = req.params.brandname;

    models.Shoes.find({brand : brand}, function(err, brandResults){
      if (err){
        return next(err);
      }
      else{
        res.json(brandResults);
      }
    })
  }

  const checkSize = function(req, res, next){

    var size = req.params.size;

    models.Shoes.find({size : size}, function(err, sizeResults){
      if (err){
        return next(err);
      }
      else{
        res.json(sizeResults);
      }
    })
  }

  const checkColor = function(req, res, next){

    var color = req.params.color;

    models.Shoes.find({color : color}, function(err, colorResults){
      if (err){
        return next(err);
      }
      else{
        res.json(colorResults);
      }
    })
  }

  const getSizeAndBrand= function(req, res, next){

    var brand = req.params.brand;
    var size = req.params.size;

    models.Shoes.find({brand : brand, size : size}, function(err, sizeBrandResults){
        if (err){
          return next(err);
        }
        else {
          res.json(sizeBrandResults);
        }
    })
  }

  const getColorAndBrand= function(req, res, next){

    var brand = req.params.brand;
    var color = req.params.color;

    models.Shoes.find({brand : brand, color : color}, function(err, colorBrandResults){
        if (err){
          return next(err);
        }
        else {
          res.json(colorBrandResults);
        }
    })
  }

  const getColorAndSize= function(req, res, next){

    var size = req.params.size;
    var color = req.params.color;

    models.Shoes.find({size : size, color : color}, function(err, colorSizeResults){
        if (err){
          return next(err);
        }
        else {
          res.json(colorSizeResults);
        }
    })
  }

  const checkStock = function(req, res, next){

    var id = req.params.id;

    models.Shoes.findOneAndUpdate({_id:id},{$inc:{in_stock:-1}},{upsert:false}, function(err, stockResults){
      if (err){
        return next(err);
      }
      else {
          res.json(stockResults);
      }
    })
  }


return{
  addShoes,
  getShoes,
  checkBrand,
  checkSize,
  checkColor,
  getSizeAndBrand,
  getColorAndBrand,
  getColorAndSize,
  checkStock
  }
}
