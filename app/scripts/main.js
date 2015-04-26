'use strict';

var target = 2000,
    cupSize = 100,
    addDrinkButtonNode = $('#add-drink-button'),
    waterQuantityNode = $('.water-quantity'),
    waterQuantityValueNode = $('.water-log-quantity-value'),
    waterQuantityCupNode = $('.water-log-quantity-cups'),
    waterQuantityPercentageNode = $('.water-quantity-percentage'),
    cupNode = $('.cup'),
    cupCheckNode = $('.cup-check'),
    cupNumberNode = $('.cup-number'),
    historyLogNode = $('.history-log-list'),
    saveTime,
    drinkLog,
    newDrinkLog,
    generateId,
    todayDrinks;


var drinkLog = [];
var drinkInfo = {};

// New object constructor
function newDrinkInfo() {

    var now = new Date();

    drinkInfo = {
        date: [ now.getMonth() + 1, now.getDate(), now.getFullYear() ],
        time: [ now.getHours(), now.getMinutes(), now.getSeconds() ],
    };
}

function totalDrinks() {
    var count = 0;  
    for (var i=0, n=todayDrinks.length; i<n; i++){
        count += todayDrinks[i];
    }
    return count;
};

function addDrink() {
    todayDrinks.push(cupSize);
    newDrinkInfo();
    drinkLog.push(drinkInfo)
    localStorage['todayDrinks'] = JSON.stringify(todayDrinks);
    localStorage['drinkLog'] = JSON.stringify(drinkLog);

    console.log(todayDrinks);
    console.log(totalDrinks());
    console.log(percentageCalc());
    console.log(todayDrinks.length)

    var percentage = percentageCalc();
    var cupNumber = todayDrinks.length;
    cupNumberNode.html(cupNumber);
    historyLogNode.html(drinkLog.length)
    cupNode.eq(cupNumber - 1).addClass('cup--active');
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(todayDrinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');
};

function removeDrink() {
    todayDrinks.pop();
    drinkLog.pop();
    localStorage['todayDrinks'] = JSON.stringify(todayDrinks);
    localStorage['drinkLog'] = JSON.stringify(drinkLog);

    console.log(todayDrinks);
    console.log(totalDrinks());
    console.log(percentageCalc());

    var percentage = percentageCalc();
    var cupNumber = todayDrinks.length;
    cupNode.eq(cupNumber).removeClass('cup--active');
    cupNumberNode.html(cupNumber);
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(todayDrinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');
};

function percentageCalc() {
    var totalDrinksNumber = totalDrinks();

    return totalDrinksNumber / target * 100;
};

function resetDay() {
    todayDrinks.length = 0;
    console.log(totalDrinks());
    localStorage["todayDrinks"] = JSON.stringify(todayDrinks);

    var percentage = percentageCalc();
    cupNumberNode.html(todayDrinks.length);
    cupNode.removeClass('cup--active');
    waterQuantityNode.css('height',percentage + '%');
    waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
    waterQuantityCupNode.html(todayDrinks.length + ' cups down');
    waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');
};

// Objects to save

function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

    // Create an array with time
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

    // Determine AM or PM suffix based on the hour
      var suffix = ( time[0] < 12 ) ? "AM" : "PM";
     
    // Convert hour from military time
      time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
     
    // If hour is 0, set it to 12
      time[0] = time[0] || 12;
     
    // If seconds and minutes are less than 10, add a zero
      for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
          time[i] = "0" + time[i];
        }
      }
      // Return the formatted string
      return date.join("/") + " " + time.join(":") + " " + suffix;
}

function init() {
    if (window.localStorage) {
        var percentage;
         
        // Retreive existing value from localStorage or init empty array
        todayDrinks = JSON.parse(localStorage.getItem('todayDrinks')) || [];
        drinkLog = JSON.parse(localStorage.getItem('drinkLog')) || [];
        percentage = percentageCalc();
        
        // Set water height
        waterQuantityNode.css('height',percentage + '%');
        waterQuantityValueNode.html('You drank ' + Math.round(totalDrinks()) + 'ml');
        waterQuantityPercentageNode.html('You drank ' + '<strong>' + Math.round(totalDrinks()) + 'ml ' + '</strong>' + 'of water, '+ '<strong>' + percentage + '</strong>' + '%' + 'of the recommended daily intake');

        // Set cup checks
        cupNumberNode.html(todayDrinks.length);
        console.log(todayDrinks.length);
        cupNode.slice(0, todayDrinks.length).addClass('cup--active');
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
