fs = require('fs')

var Random = function(path) {
    this.path = path
    this.content = null
 
    this.readFile = function(cb) {
        try {
                let data = fs.readFileSync(this.path, 'utf8')
                this.content = data.split('\n')
            } catch(err) {
            throw err
        }
    }
 
    this.randomInt = function(low, high) {
        return Math.floor(Math.random() * (high - low) + low)
    }


    this.processFile = function() {
        if (this.content == null) {
            this.readFile()
        }
        return this.content[this.randomInt(0, this.content.length)]
    }
}

//const random = new Random()
module.exports = Random;

//let stuff = new Random('./strings1.txt') // file with few random strings
//console.log('from slave: '+stuff.processFile())