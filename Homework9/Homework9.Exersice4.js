function countSentencesLetters(str) {

    var newString = str.split(/[\.!\?]+/);

    newString.pop();

    var letter = newString.map(function(el) {

        var a = el.trim();

        var b = a.split(',').join('').split(' ').join('');

        console.log(a + ': Letters quantity is: ' + b.length);

    });
    
    return letter;
}

console.log(countSentencesLetters('Привет, студент! Студент... Как дела, студент?'));

