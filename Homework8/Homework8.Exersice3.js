function isPalindrome(str) {

    var str = str.toLowerCase();

    return str === str.split('').reverse().join('') ? true : false; 
}

console.log(isPalindrome('шалаШ')); 
console.log(isPalindrome('привет'));