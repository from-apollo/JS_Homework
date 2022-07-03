function deepClone(initialObj) {

    if (!initialObj) {
        return initialObj;
    }

    var clone = Array.isArray(initialObj) ? [] : {};

    for (var k in initialObj) {
        clone[k] = (typeof initialObj[k] === 'object' && initialObj[k] !== null) ? deepClone(initialObj[k]) : initialObj[k];
    }
    return clone;
}

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function() {
        alert('Hello');
    }
};

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);


