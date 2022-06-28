function Animal(name) {

    var foodAmount = 50;

    function formatFoodAmount() {
        return foodAmount + ' гр.';
    }

    this.dailyNorm = function(amount) {
        if (!arguments.length) return formatFoodAmount();

        if (amount < 30 || amount > 100) {
            return 'Недопустимое количество корма.';
        }

        foodAmount = amount;
    };

    this.name = name;

    var self = this;

    this.feed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
        return this;
    };

    this.stroke = function() {
        return this;
    }
}

function Cat(name) {

    Animal.apply(this, arguments);

    var animalFeed = this.feed;

    this.feed = function() {
        animalFeed();
        console.log('Кот доволен ^_^');
        return this;
    }

    var animalStroke = this.stroke;

    this.stroke = function() {
        animalStroke();
        console.log('Гладим кота');
        return this;
    }

}

var barsik = new Cat('Барсик');

console.log(barsik.dailyNorm(75));
barsik.feed();

console.log(barsik.stroke().stroke().feed().stroke());
