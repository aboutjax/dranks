'use strict';

var target = 2000,
    waterQuantityNode = $('.water-quantity'),
    waterQuantityValueNode = $('.water-log-quantity-value'),
    waterQuantityCupNode = $('.water-log-quantity-cups'),
    waterQuantityPercentageNode = $('.water-quantity-percentage'),
    cupNode = $('.cup'),
    cupCheckNode = $('.cup-check'),
    drinks;

function totalDrinks() {
    var count = 0;  
    for (var i=0, n=drinks.length; i<n; i++){
        count += drinks[i];
    }
    return count;
};

function addDrink() {
    drinks.push(250);
    console.log(drinks);
    localStorage['drinks'] = JSON.stringify(drinks);
    console.log(totalDrinks());
    console.log(percentageCalc());
    console.log(drinks.length)

    var percentage = percentageCalc();
    var cupNumber = drinks.length;
    cupNode.eq(cupNumber - 1).addClass('cup--active');
    cupCheckNode.eq(cupNumber - 1).addClass('cup-check--active');
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(drinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');
};

function removeDrink() {
    drinks.pop();
    console.log(drinks);
    localStorage['drinks'] = JSON.stringify(drinks);
    console.log(totalDrinks());
    console.log(percentageCalc());

    var percentage = percentageCalc();
    var cupNumber = drinks.length;
    cupNode.eq(cupNumber).removeClass('cup--active');
    cupCheckNode.eq(cupNumber).removeClass('cup-check--active');
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(drinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');
};

function percentageCalc() {
    var totalDrinksNumber = totalDrinks();

    return totalDrinksNumber / target * 100;
};

function resetDay() {
    drinks.length = 0;
    console.log(totalDrinks());
    localStorage["drinks"] = JSON.stringify(drinks);

    var percentage = percentageCalc();
    cupNode.removeClass('cup--active');
    cupCheckNode.removeClass('cup-check--active');
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(drinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');
};

function init() {
    if (window.localStorage) {
        var percentage;
         
        // Retreive existing value from localStorage or init empty array
        drinks = JSON.parse(localStorage.getItem('drinks')) || [];
        percentage = percentageCalc();
        
        // Set water height
        waterQuantityNode.css('height',percentage + '%');
        waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
        waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');

    } else {
        // Handle no local storage
        console.log('Browser doesn\'t support localStorage');
    }
}

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

$(document).ready(init);

$(document).keypress(function(e) {
  if(e.charCode == 61) {
    addDrink();
  } else {
    //nothing
  }
});

$(document).keypress(function(e) {
  if(e.charCode == 45) {
    removeDrink();
  } else {
    //nothing
  }
});

$(document).keypress(function(e) {
  if(e.charCode == 48) {
    resetDay();
  } else {
    //nothing
  }
});

