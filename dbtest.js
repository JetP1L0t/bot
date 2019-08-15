var Datastore = require('nedb');
var db = new Datastore({filename : 'media.json'});
db.loadDatabase();
/*
db.insert({trigger : "арбайт", pic_path: 'arbeit'});
db.insert({trigger : "работать", pic_path: 'arbeit'});
db.insert({trigger : "попа\s", pic_path: 'popki'});
db.insert({trigger : "жопа", pic_path: 'arbpopkieit'});
db.insert({trigger : "задница", pic_path: 'popki'});
db.insert({trigger : "сиси", pic_path: 'siski'});
db.insert({trigger : "сиськи", pic_path: 'siski'});
db.insert({trigger : "пизда", pic_path: 'piski'});
db.insert({trigger : "мальчика", pic_path: 'guys'});
db.insert({trigger : "девачку", pic_path: 'full'});
db.insert({trigger : "стродать", pic_path: 'strodat'});
db.insert({trigger : "коробки", pic_path: 'single/korobki.jpg'});
db.insert({trigger : "выпороть", pic_path: 'single/vyporot.jpg'});
// db.update({year: 1946}, {name: "Doug the Head", year: 1940}, {});
// db.remove({year: 1940}, {});
*/

db.findOne({trigger: "коробки"}, function (err, docs) {
   console.log(docs.pic_path);
});

db.find({}, function (err, docs) {
  //    console.log(docs);
      docs.forEach(element => {
         var str = "asdasd сисьdки jhkjh";
         if (str.includes(element.trigger)) {
         console.log(element.trigger)}
      });
});
