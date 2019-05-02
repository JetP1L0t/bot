var randomstring = require('./randomstring.js');
//import Random from "./randomstring.js";

{
    let stuff = new randomstring('./strings1.txt')
console.log('from master: '+stuff.processFile())
console.log('from master: '+stuff.processFile())
}
{
    let stuff = new randomstring('./strings2.txt')
console.log('from master: '+stuff.processFile())
console.log('from master: '+stuff.processFile())
}
//console.log(randomstring.Random('./strings1.txt'));