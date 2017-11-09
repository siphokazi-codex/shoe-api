//Declaring my buttons
var searchButton = document.querySelector('#searchBtn');
var filterShoe = document.querySelector('#filterShoe');
var addButton = document.querySelector('#addBtn');
var addStock = document.querySelector('#addStock');
//Declaring my modal box
var modal = document.querySelector('#addModal');

//Declaring my textboxes
var searchText = document.querySelector('#searchTxt');
var brandValue = document.querySelector('#brandTxt');
var colorValue = document.querySelector('#colorTxt');
var priceValue = document.querySelector('#priceTxt');
var stockValue = document.querySelector('#stockTxt');
var sizeValue = document.querySelector('#sizeTxt');
var imageValue = document.querySelector('#imageTxt');

//Declaring my templates
var shoeTempText = document.querySelector('.shoesTemp').innerHTML;
var brandTempText = document.querySelector('.brandTemp').innerHTML;
var colorTempText = document.querySelector('.colorTemp').innerHTML;
var sizeTempText = document.querySelector('.sizeTemp').innerHTML;

//Compiling my templates
var shoesTemplate = Handlebars.compile(shoeTempText);
var brandTemplate = Handlebars.compile(brandTempText);
var colorTemplate = Handlebars.compile(colorTempText);
var sizeTemplate = Handlebars.compile(sizeTempText);

//Targets the div on the html file
var shoeListElem = document.querySelector('.shoeList');
var brandListElem = document.querySelector('#brand');
var colorListElem = document.querySelector('#color');
var sizeListElem = document.querySelector('#size');

//Declaring array that will handle shoe list
var shoes = [];
var shoeList = [];

//Function to get all the shoes in the database
function getShoes(url, cb) {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', url);
  ajaxRequest.onload = function() {
    var data = JSON.parse(ajaxRequest.responseText);
    cb(data);
  }
  ajaxRequest.send();
}


//Function to get all shoe brands
function getBrand(url, cb) {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', url);
  ajaxRequest.onload = function() {
    var data = JSON.parse(ajaxRequest.responseText);
    cb(data);
  }
  ajaxRequest.send();
}
//Function to get all shoe colours
function getColor(url, cb) {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', url);
  ajaxRequest.onload = function() {
    var data = JSON.parse(ajaxRequest.responseText);
    cb(data);
  }
  ajaxRequest.send();
}

//Function to get all shoe sizes
function getSize(url, cb) {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', url);
  ajaxRequest.onload = function() {
    var data = JSON.parse(ajaxRequest.responseText);
    cb(data);
  }
  ajaxRequest.send();
}

//Function to filter shoes according to brand
function buyShoes(url, cb) {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', url);
  ajaxRequest.onload = function() {
    var data = JSON.parse(ajaxRequest.responseText);
    cb(data);
  }
  ajaxRequest.send();
}

//Function shoes add API on the databse
function addShoes(data, cb) {

  qwest
    .post('/api/shoes', data)
    .then(cb);
}

//Function for my search textbox, search on keyup
function search() {
  shoeList = shoes;
  shoeListElem.innerHTML = "";
  var filteredList = [];
  for (var i = 0; i < shoeList.length; i++) {
    var checkShoes = shoeList[i];

    if (checkShoes.brand.indexOf(searchText.value) != -1) {
      console.log(searchText.value);
      var div = document.createElement('div');
      div.textContent = checkShoes.brand;
      shoeListElem.appendChild(div);
      filteredList.push(checkShoes);
      shoeListElem.innerHTML = shoesTemplate({
        shoeData: filteredList
      });
    }
  }
}

//Function for searche button.
function searchField() {
  search();
  searchText.value = "";
}

//Get the API'S from index.js
//An API to get all shoes in the databse
getShoes('/api/shoes', function(allShoes) {
  shoeListElem.innerHTML = shoesTemplate({
    shoeData: allShoes
  })
  shoes = allShoes;
})

function buyingShoe(e) {

  var _id = e.target.id;
  console.log(_id);
  $.post({
    url: '/api/shoes/sold/' + _id,
    type: 'POST',
    success: function(purchased) {
      getShoes();
    }
  })
}
shoeListElem.addEventListener("click", buyingShoe);

//An API to get the shoe brand
getBrand('/api/shoes/brand', function(data) {
  brandListElem.innerHTML = brandTemplate({
    brandData: data.brands
  })
})

//An API to get the shoe color
getColor('/api/shoes/color', function(data) {
  colorListElem.innerHTML = colorTemplate({
    colorData: data.colors
  })
})

//An API to get the shoe size
getSize('/api/shoes/size', function(data) {
  sizeListElem.innerHTML = sizeTemplate({
    sizeData: data.sizes
  })
})



////Event Listener that get an API for brand
filterShoe.addEventListener("click", function() {
  var brandClass = document.querySelector("#brandClass");
  var brand = brandClass.value;
  getBrand('/api/shoes/brand/' + brand, function(input) {
    shoeListElem.innerHTML = shoesTemplate({
      shoeData: input
    });
  });
});

//Event Listener that get an API for color
filterShoe.addEventListener("click", function() {
  var colorClass = document.querySelector("#colorClass");
  var color = colorClass.value;
  getColor('/api/shoes/color/' + color, function(input) {
    shoeListElem.innerHTML = shoesTemplate({
      shoeData: input
    })
    //console.log(input);
  });
})

//Event Listener that gets an API for brand
filterShoe.addEventListener("click", function() {
  var sizeClass = document.querySelector("#sizeClass");
  var size = sizeClass.value;
  getSize('/api/shoes/size/' + size, function(input) {
    shoeListElem.innerHTML = shoesTemplate({
      shoeData: input
    })
  });
})

//Event Listeners for functionality
//Event Listener for the search text box, triggered on keyUp.
searchText.addEventListener('keyup', search);

//Event Listener for search button, triggered on click event.
searchButton.addEventListener('click', searchField);

//Event Listener for add new stock, triggered on click event.
addStock.addEventListener("click", function() {
  var brandV = brandValue.value;
  var priceV = priceValue.value;
  var colorV = colorValue.value;
  var sizeV = sizeValue.value;
  var stockV = stockValue.value;
  var imageV = imageValue.value;

  console.log(brandV);
  var newStock = {
    brand: brandV,
    price: priceV,
    color: colorV,
    size: sizeV,
    in_stock: stockV,
    shoe_image: imageV
  };

  var addAll = addShoes(newStock, function() {

    shoeListElem.innerHTML = shoesTemplate({
      shoeData: newStock
    });

    brandV = "";
    priceV = "";
    colorV = "";
    sizeV = "";
    stockV = "";
    imageV = "";
  })
})
