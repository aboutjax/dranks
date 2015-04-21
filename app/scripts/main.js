var drinks = JSON.parse(localStorage.getItem('drinks'));

if (drinks.length<1){
    console.log('NO DRINKS YET');
}

totalDrinks = function(){
    'use strict';
    var count = 0;  
    for (var i=0, n=drinks.length; i<n; i++){
        count += drinks[i];
    }
    return count;
};

addDrink = function() {
    'use strict';
    drinks.push(250);
    console.log(drinks);
    localStorage['drinks'] = JSON.stringify(drinks);
    console.log(totalDrinks());
    console.log(percentageCalc());

    var percentage = percentageCalc();
    $('.water-quantity').css('height',percentage + '%');
    $('.water-log-percentage').html(Math.round(percentage) + '%');
};

target = 2000;

percentageCalc = function() {
    'use strict';
    var totalDrinksNumber = totalDrinks();

    return totalDrinksNumber / target * 100;
};

resetDay = function() {
    'use strict';
    drinks.length = 0;
    console.log(totalDrinks());
    localStorage["drinks"] = JSON.stringify(drinks);
    var percentage = percentageCalc();
    $('.water-quantity').css('height',percentage + '%');
    $('.water-log-percentage').html(Math.round(percentage) + '%');
};

window.onload = function() {
    'use strict';
    var percentage = percentageCalc();
    $('.water-quantity').css('height',percentage + '%');
    $('.water-log-percentage').html(Math.round(percentage) + '%');
};

