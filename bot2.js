#!/usr/bin/env node

const TeleBot = require('telebot');
var dateFormat = require('dateformat');
var newSet = require('./config.js');

const where = './pics/';
bot = new TeleBot(newSet);

function choosePic(what, chat_id, requester_name, requester_id) {
	//var when = new Date(Date.now());
	var now = new Date();  
	var fs = require('fs');
	var files = fs.readdirSync(where+what);
	var arr = [
				// -1001314628360, // test4
				123
			];		

	let chosenFile = where + what +'/'+ files[Math.floor(Math.random() * files.length)]

	if (arr.includes(chat_id)) {
		return '';
	} else {
		bot.getChat(chat_id).then(function(data) {
			if (data.username != undefined) {chat_name = data.username} else {chat_name = data.title;}
			console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss o") +' sent ' + chosenFile + 
			'\n to \@' + chat_name + ' \['+ chat_id + '\] by request of ' + requester_name + ' \[' + requester_id +'\]');
		});

		return chosenFile;
	};
}

bot.on(/(update)/, (msg) => {
	if ((msg.chat.id=29884911)&(msg.from.id=29884911)) {
	const execSync = require('child_process').execSync;
//	var cmd = execSync('git status',
	var cmd1 = execSync('git pull',
        (error, stdout, stderr) => {
			state = 'STDOUT: ' + stdout +'\n STDERR:' + stderr + '\n ERR: '+ error;
			console.log(state);
			console.log('repo updated')
		});
	return msg.reply.text(cmd1, { asReply: true });
	} else { return '';}});

bot.on(/(restart)/, (msg) => {
	if ((msg.chat.id=29884911)&(msg.from.id=29884911)) {
	const execSync = require('child_process').execSync;
	//var cmd = execSync('forever restart slave.js --no-colors',
	var cmd2 = execSync('forever restart bot2.js --no-colors',
		(error, stdout, stderr) => {
//			state = 'STDOUT: ' + stdout +'\n STDERR:' + stderr + '\n ERR: '+ error;
//			console.log(state);
			console.log('bot restarted')
		});
	return msg.reply.text(cmd2, { asReply: true });
} else { return '';}});


bot.on(/(ниа)/i, (msg) => {
return msg.reply.text('пидарасы!',{ asReply: true });
});

//bot.on(/(п\s)?си*/, (msg) => {
//bot.on(/(да\sили\sнет\?)/, (msg) => {
bot.on(/^(exact\soption\?|another_option|да\sили\sнет\?)/, (msg) => {
		return msg.reply.photo(choosePic('yesno',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});

bot.on(/(арбайт|работать)/i, (msg) => {
	return msg.reply.photo(choosePic('arbeit',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});

bot.on(/(попа|жопа|задница)/i, (msg) => {
	console.log(msg.chat.id + ' ' + msg.from.username + ' ' + msg.from.id);
return msg.reply.photo(choosePic('popki',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});

bot.on(/(сиси|сиськи)/i, (msg) => {
return msg.reply.photo(choosePic('siski',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.on(/(дева)/i, (msg) => {
return msg.reply.photo(choosePic('full',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.on(/(рейдим\sтира|рэйдим\sтира)/i, (msg) => {
	return bot.sendDocument(
			msg.chat.id,
			choosePic('gifs/poke',msg.chat.id,msg.from.username,msg.from.id),
			{replyToMessage: msg.message_id}
	)
});

bot.start();

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
  });