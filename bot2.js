#!/usr/bin/env node

const TeleBot = require('telebot');
const newSet = {
// iwantsome
//	token: '791540308:AAHVEHwF2yr0ARFEarBGCGVDlVco1stOg1c',
// jetp1l0t_bot
	token: '866834920:AAHKusBh8qQaIHd7pTfK5tXb4KQwBV9hUa8',
        polling: { interval: 1000, limit: 1, timeout: 5, retryTimeout: 5000, proxy: 'http://pu:pu@de.trolo.bid:14448' },
	// webhook:  { url: 'https://trolo.bid/zhelezka', host: 'localhost', port: 3000 },
	usePlugins: ['ignoreMessagesBeforeStart','floodProtection']
	};
const where = './pics/';
bot = new TeleBot(newSet);

function choosePic(what,chat_id,requester_name,requester_id) {
//var when = new Date(Date.now());

var dateFormat = require('dateformat');
var now = new Date();

var fs = require('fs');
var files = fs.readdirSync(where+what);
var arr = [
			// -1001314628360, // test4
			123
		];		
let chosenFile = where + what +'/'+ files[Math.floor(Math.random() * files.length)]

if (arr.includes(chat_id)) {return '';}
else	{
			bot.getChat(chat_id).then(function(data) {
			if (data.username != undefined) {chat_name = data.username} else {chat_name = data.title;}
			console.log(dateFormat(now, "yyyy-mm-dd HH:MM:ss o") +' sent ' +chosenFile + 
			'\n to \@' + chat_name + ' \['+ chat_id + '\] by request of ' + requester_name + ' \[' + requester_id +'\]');
			});
		return chosenFile;
		};
}

bot.on(/(showmeid)/, (msg) => {
return msg.reply.text(msg.chat.id, { asReply: true });
});

bot.on(/(ниа)/, (msg) => {
return msg.reply.text('пидарасы!',{ asReply: true });
});

//bot.on(/(п\s)?си*/, (msg) => {
bot.on(/(да\sили\sнет\?)/, (msg) => {	
return msg.reply.photo(choosePic(''),{ asReply: true });
});

bot.on(/(арбайт)/i, (msg) => {
return msg.reply.photo(choosePic('arbeit'), { asReply: true });
});

bot.on(/(работать)/i, (msg) => {
return msg.reply.photo(choosePic('arbeit'), { asReply: true });
});

bot.on(/(попа)/i, (msg) => {
	console.log(msg.chat.id + ' ' + msg.from.username + ' ' + msg.from.id);
return msg.reply.photo(choosePic('popki',msg.chat.id,msg.from.username,msg.from.id), { asReply: true });
});

bot.on(/(сиси)/i, (msg) => {
return msg.reply.photo(choosePic('siski',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.on(/(дева)/i, (msg) => {
return msg.reply.photo(choosePic('full',msg.chat.id,msg.from.username,msg.from.id),{ asReply: true });
});

bot.start();
