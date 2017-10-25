const assert = require('assert');
const Models = require('../models');

describe('models should be able to', function(){

  var models = Models('mongodb://localhost/shoes-test');

    beforeEach(function(done) {
     models.Shoes.remove({}, function(err, results){
         done(err);
       })
     });

  it('stores shoes entered by user to MongoDB', function(done){

    var shoeData = { brand : 'The test Shoes'};
    models.Shoes
      .create(shoeData, function(err){
        if (err) {
          return done(err);
        }

         models.Shoes.find(shoeData, function(err, brand){
             assert.equal(1, brand.length);
             done(err);
         });
      });
  });

    it('should not allow duplicate shoes numbers', function(done){
      var shoeData = {
      shoeData: 'The test shoeData'
    };
    models.Shoes
      .create(shoeData, function(err) {
        if (err) {
          return done(err);
        }
        //done(err);
        models.Shoes.create(shoeData, function(err, shoeData) {
          assert.ok(err, "Duplicate value exception should have been thrown!");
          //  assert.equal(1, shoeData.length);
          done();
        });

      });
    });
});
