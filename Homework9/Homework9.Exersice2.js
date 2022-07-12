var arr = ['00', '13', '24'];

function result(accumulator, index) {
    return accumulator + ' : ' + index;
}

console.log(arr.reduce(result, 'Текущее время'));