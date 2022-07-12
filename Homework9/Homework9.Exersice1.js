var names = ['Vasya', 'Polina', 'Kolya'];

var nameObj = names.map(function(nameInArr) {

    return {name: nameInArr};
});

console.log(nameObj);
