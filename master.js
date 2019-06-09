var randomstring = require('./randomstring.js');

{
let stuff = new randomstring('./strings1.txt');
console.log('from master: '+stuff.processFile());
}