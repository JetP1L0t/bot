#!/usr/bin/env node

const TeleBot = require('telebot');
var dateFormat = require('dateformat');
var newSet = require('./config.js');
var randomstring = require('./randomstring.js');

const where = './pics/';
bot = new TeleBot(newSet);

var Datastore = require('nedb');
var db = new Datastore({filename : 'media.json'});
db.loadDatabase();

function is_dir(path) {
	var fs = require('fs');
    try {
		console.log(fs.lstatSync(path+'/').isFile());
        return true;
    } catch (e) {
        return false;
    }
}


function choosePic(what, chat_id, requester_name, requester_id) {
	//var when = new Date(Date.now());
	var now = new Date();  
	var fs = require('fs');
	var arr = [ // array of banned chats
				// -1001314628360, // test4
				123
		  ];
	if (is_dir(where+what)) {
		var files = fs.readdirSync(where+what);
		var chosenFile = where + what +'/'+ files[Math.floor(Math.random() * files.length)]
	}
	else {
		var chosenFile = where + what;
	} 

	if (arr.includes(chat_id)) {
		return '';
	} else {
		bot.getChat(chat_id).then(function(data) {
			if (data.username != undefined) {chat_name = data.username} else {chat_name = data.title;}
			console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss o") +' sent ' + chosenFile + 
			'\nto \@' + chat_name + ' \['+ chat_id + '\] by request of ' + requester_name + ' \[' + requester_id +'\]');
		});
		return chosenFile;
	};
}

bot.on('text', (msg) => {
//  console.log(msg);
    db.find({}, function (err, docs) {
      docs.forEach(element => {
        if (msg.text.includes(element.trigger)) { //if no .mp4 then ok, else send doc
          return msg.reply.photo(choosePic(element.pic_path,msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
        }
      });
    });
});

bot.on('photo', (msg) => {
  console.log(msg);
  let id = msg.from.id;
  let file_id = msg.photo[2].file_id;
  //msg.getFile.
  console.log('file_id', file_id);

  return bot.getFile(file_id).then(x => {
    console.log("GetFileResp", x);
    let fileLink = 'https://api.telegram.org/file/bot'+bot.token+'/'+ x.file_path;
    bot.sendMessage(id, 'File Link: '+ fileLink );
  });
});

bot.on(/(ниа)/i, (msg) => {
  return msg.reply.text('пидарасы!',{ asReply: true });
});

bot.start();

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
});