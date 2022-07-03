function deepEqual(a, b) {

    Array.isArray(a, b) ? [] : {};

    if ((typeof a === 'object' && typeof b === 'object') && (a !== null && b !== null)) {

        for(var k in a) {
            if (!b.hasOwnProperty(k)) {
                return false;
            }

            if ((typeof a[k] === 'object' && typeof b[k] === 'object') && (a[k] === Array.isArray(a) && b[k] === Array.isArray(b))) {
                var result = deepEqual(a[k], b[k])
                if (!result) {
                    return false;
                }
            } else {
                if (a[k] !== b[k]) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return a === b;
    }
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

console.log(deepEqual(initialObj, initialObj));
console.log(deepEqual(initialObj, {string: 'Vasya', number: 30}));
console.log(deepEqual(initialObj, {string: 'Vasya', number: 30, boolean: true}));

