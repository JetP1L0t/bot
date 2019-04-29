fs = require('fs')
var data;
fs.readFile('filename.txt', 'utf8', function (err,rawData) {
if (err) {
return console.log(err);
}
data = rawData.split('\n');
});

function randomInt (low, high) {
return Math.floor(Math.random() * (high - low) + low);
}

function getRandomLine(){
return data[randomInt(0,data.length)];
}