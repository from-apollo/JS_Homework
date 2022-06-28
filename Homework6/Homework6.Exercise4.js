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
    };
}

function Cat(name) {

    Animal.apply(this, arguments);

    var animalFeed = this.feed;

    this.feed = function() {
        animalFeed();
        console.log('Кот доволен ^_^');
    }
}

var barsik = new Cat('Барсик');

console.log(barsik.dailyNorm());
barsik.feed();

console.log(barsik.dailyNorm(200));
barsik.feed();

console.log(barsik.dailyNorm(75));
barsik.feed();

