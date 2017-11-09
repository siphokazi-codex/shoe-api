'use strict';

const express = require('express');
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const ShoesRoutes = require('./shoes-api');
const Models = require('./models');

const flash = require('express-flash');

const session = require('express-session');
const app = express();

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/shoes-catalogue';

const models = Models(mongoURL);

const shoesRoutes = ShoesRoutes(models);

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
app.use(flash());

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Including your public folder, to have access of the contents in there.
app.use(express.static('public'))

// parse application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
  extended: false
}))

// create application/json parser
app.use(bodyParser.json())

//app.get("/", ){});

app.get('/api/shoes', shoesRoutes.getShoes);
app.get('/api/shoes/brand', shoesRoutes.uniqueBrands);
app.get('/api/shoes/color', shoesRoutes.uniqueColors);
app.get('/api/shoes/size', shoesRoutes.uniqueSizes);
app.get('/api/shoes/brand/:brand', shoesRoutes.checkBrand);
app.get('/api/shoes/size/:size', shoesRoutes.checkSize);
app.get('/api/shoes/color/:color', shoesRoutes.checkColor);
app.get('/api/shoes/brand/:brand/size/:size', shoesRoutes.getSizeAndBrand);
app.get('/api/shoes/brand/:brand/color/:color', shoesRoutes.getColorAndBrand);
app.get('/api/shoes/size/:size/color/:color', shoesRoutes.getColorAndSize);
app.post('/api/shoes', shoesRoutes.addShoes);
app.post('/api/shoes/sold/:id', shoesRoutes.checkStock);

var server = app.listen(process.env.PORT || 3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Shoe Catalogue API app listening at http://%s:%s', host, port);

});
