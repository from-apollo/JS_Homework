function areAnagrams(str1, str2) {

    var str1 = str1.toLowerCase();

    var str2 = str2.toLowerCase();
    
    return str1 === str2.split('').sort().join('') ? true : false; 
}

console.log(areAnagrams('кот', 'Отк')); 
console.log(areAnagrams('кот', 'атк')); 
console.log(areAnagrams('кот', 'отко')); 