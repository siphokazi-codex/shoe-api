//Declaring my buttons and textfield
var searchButton = document.querySelector('#searchBtn');
var searchText = document.querySelector('#searchTxt');
var addButton = document.querySelector('#addBtn');

var brandValue = document.querySelector('#brandTxt');
var colorValue = document.querySelector('#colorTxt');
var priceValue = document.querySelector('#priceTxt');
var stockValue = document.querySelector('#stockTxt');
var sizeValue = document.querySelector('#sizeTxt');

//template
var shoeTempText = document.querySelector('.shoesTemp').innerHTML;
var brandTempText = document.querySelector('.brandTemp').innerHTML;
var colorTempText = document.querySelector('.colorTemp').innerHTML;
var sizeTempText = document.querySelector('.sizeTemp').innerHTML;

//for template compile
var shoesTemplate = Handlebars.compile(shoeTempText);
var brandTemplate = Handlebars.compile(brandTempText);
var colorTemplate = Handlebars.compile(colorTempText);
var sizeTemplate = Handlebars.compile(sizeTempText);

//targets the div on the html file
var shoeListElem = document.querySelector('.shoeList');
var brandListElem = document.querySelector('#brand');
var colorListElem = document.querySelector('#color');
var sizeListElem = document.querySelector('#size');

//display all shoes on program load
//shoeListElem.innerHTML = shoesTemplate({shoeData});
//brandListElem.innerHTML = brandTemplate({brandData});
//colorListElem.innerHTML = colorTemplate({colorData});
//sizeListElem.innerHTML = sizeTemplate({sizeData});

function getShoes(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
       var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    }
    ajaxRequest.send();
}

getShoes('/api/shoes', function(getDatabase){

  shoeListElem.innerHTML = shoesTemplate({shoeData : getDatabase})
})

function addShoes(url, data, cb){

  qwest
    .post(url, data)
    .then(cb);
}

addButton.addEventListener("click", function(){
  var brandV = brandValue.value;
  var priceV = priceValue.value;
  var colorV = colorValue.value;
  var sizeV = sizeValue.value;
  var stockV = stockValue.value;

  console.log(brandV);
  var newStock = {
                brand: brandV,
                 price: priceV,
                 color: colorV,
                 size: sizeV,
                 in_stock: stockV

               };


addShoes('/api/shoes', newStock, function(){

    shoeListElem.innerHTML  = shoesTemplate({shoeData : newStock});

    brandValue.value = "";
    priceValue.value = "";
    colorValue.value = "";
    sizeValue.value = "";
    stockValue.value = "";

  })
})

//function for my sear6ch textbox
function search () {25
  shoeListElem.innerHTML = shoesTemplate({shoeData});
  console.log(shoeListElem);

  shoeListElem.innerHTML = "";
  var filteredList = [];
  for (var i=0; i < shoeData.length; i++) {
  var shoes = shoeData[i];

  if (shoes.brand.indexOf(searchText.value) !=-1) {
    console.log(searchText.value);
    var div = document.createElement('div');
    div.textContent = shoes.brand;
    shoeListElem.appendChild(div);
    filteredList.push(shoes);
    shoeListElem.innerHTML = shoesTemplate({shoeData: filteredList});
  }
 }
}


searchText.addEventListener('keyup', search);
