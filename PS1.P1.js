const string = input => input.split('').sort().reverse().join('');

let result = string("supercalifragilisticexpialidocious");

console.log(`${result}`);

module.exports= {string};