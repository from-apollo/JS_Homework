function findVowels(str){

    var vowelsArr = ['а', 'о', 'у', 'и', 'э', 'ы', 'я', 'ю', 'е', 'ё'];

    var counter = 0;

    var myStrArr = str.toLowerCase().split('');

    vowelsArr.forEach(function(letter) {
        myStrArr.forEach(function(myLetter) {
            if (myLetter === letter) {
                 counter++;
            }
        });
    });
    
    return counter;
};

 console.log(findVowels('Привет, как дела?'));