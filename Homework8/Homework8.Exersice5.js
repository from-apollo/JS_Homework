function divideArr(arr, n) {

        if (n > 0) {

            var newArr = [];

            while (arr.length !== 0) {

                newArr.push(arr.splice(0, n));
            }

            return newArr;
        } 

        return arr;
}

console.log(divideArr([1, 2, 3, 4], 2)); 
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3)); 
console.log(divideArr([1, 2, 3, 4, 5], 0));


