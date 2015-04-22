'use strict';

var target = 2000,
    waterQuantityNode = $('.water-quantity'),
    waterQuantityValueNode = $('.water-log-quantity-value'),
    waterQuantityCupNode = $('.water-log-quantity-cups'),
    waterQuantityPercentageNode = $('.water-quantity-percentage'),
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

    var percentage = percentageCalc();
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html(Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(drinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + percentage + '%' + 'of the recommended daily intake')
};

function removeDrink() {
    drinks.pop();
    console.log(drinks);
    localStorage['drinks'] = JSON.stringify(drinks);
    console.log(totalDrinks());
    console.log(percentageCalc());

    var percentage = percentageCalc();
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html(Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(drinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + percentage + '%' + 'of the recommended daily intake')
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
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html(Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(drinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + percentage + '%' + 'of the recommended daily intake')
};

function init() {
    if (window.localStorage) {
        var percentage;
         
        // Retreive existing value from localStorage or init empty array
        drinks = JSON.parse(localStorage.getItem('drinks')) || [];
        percentage = percentageCalc();
        
        // Set water height
        waterQuantityNode.css('height',percentage + '%');
        waterQuantityValueNode.html(Math.round(totalDrinks()) + 'ml');
        waterQuantityPercentageNode.html('You drank ' + percentage + '%' + 'of the recommended daily intake')

        if (drinks.length == 0){
            waterQuantityCupNode.html('Time to hydrate!')
        } else {
            waterQuantityCupNode.html(drinks.length + ' cups down');
        }
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

