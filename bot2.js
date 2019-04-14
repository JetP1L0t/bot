#!/usr/bin/env node

const TeleBot = require('telebot');
var dateFormat = require('dateformat');
var newSet = require('./config.js');

const where = './pics/';
bot = new TeleBot(newSet);


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
	var arr = [
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


bot.on(/(update)/, (msg) => {
	if (msg.chat.id=29884911) {
	const execSync = require('child_process').execSync;
	var cmd1 = execSync('git pull',
        (error, stdout, stderr) => {
			state = 'STDOUT: ' + stdout +'\n STDERR:' + stderr + '\n ERR: '+ error;
			console.log(state);
			console.log('bot updated')
		});
	return msg.reply.text(cmd1, { asReply: true });
	} else { return '';}});


bot.on(/(restart)/, (msg) => {
	if (msg.chat.id=29884911) {
	const execSync = require('child_process').execSync;
	var cmd2 = execSync('forever restart bot2.js --no-colors',
		(error, stdout, stderr) => {
			state = 'STDOUT: ' + stdout +'\nSTDERR:' + stderr + '\nERR: '+ error;
			console.log(state);
			console.log('bot restarted')
		});
	return msg.reply.text(cmd2);
} else { return '';}});


bot.on(/(ниа)/i, (msg) => {
return msg.reply.text('пидарасы!',{ asReply: true });
});


bot.on('newChatMembers', (msg) =>
	{
	if (msg.new_chat_member.username) {
										msg.reply.text('@'+msg.new_chat_member.username+' привет!',{ asReply: true });
									}
	else {
			msg.reply.text(msg.new_chat_member.first_name+' привет!',{ asReply: true });
		}
	}
);

bot.on('leftChatMember', (msg) =>
{
if (msg.left_chat_member.username) {
									msg.reply.text('Прощай @'+msg.left_chat_member.username,{ asReply: true });
								}
else {
		msg.reply.text('Прощай '+msg.left_chat_member.first_name,{ asReply: true });
	}
}
);


bot.on(/^(exact\soption\?|another_option|да\sили\sнет\?)/, (msg) => {
	return msg.reply.photo(choosePic('yesno',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});


bot.on(/(арбайт|работать)/i, (msg) => {
	return msg.reply.photo(choosePic('arbeit',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});

bot.on(/(попа\s|жопа|задница)/i, (msg) => {
	return msg.reply.photo(choosePic('popki',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});

bot.on(/(сиси|сиськи|тити)/i, (msg) => {
	return msg.reply.photo(choosePic('siski',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.on(/(дева)/i, (msg) => {
	return msg.reply.photo(choosePic('full',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.on(/(коробки)/i, (msg) => {
	return msg.reply.photo(choosePic('single/korobki.jpg',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.on(/(рейдим\sтира|рэйдим\sтира|на\sтира)/i, (msg) => {
	return bot.sendDocument(
			msg.chat.id,
			choosePic('single/tyr.gif',msg.chat.id,msg.from.username,msg.from.id),
			{replyToMessage: msg.message_id}
	)
});

bot.start();

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
  });