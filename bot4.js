#!/usr/bin/env node

const TeleBot = require('telebot');
var dateFormat = require('dateformat');
var newSet = require('./config.js');
var randomstring = require('./randomstring.js');
var checkUserId;
const where = './pics/';
bot = new TeleBot(newSet);

var Datastore = require('nedb');
var dbMedia = new Datastore({filename : 'media.json'});
var dbUsers = new Datastore({filename : 'users.json'});
var dbChats = new Datastore({filename : 'chats.json'});
dbMedia.loadDatabase();
dbUsers.loadDatabase();
dbChats.loadDatabase();

function ifUserExists(checkUserId, callback) {

    dbUsers.find({userId:checkUserId}, function (err, docs) {
    console.log('TOTAL: '+docs.length);

    if (docs.length==0) {
        console.log('NEW USER! ID: '+checkUserId);
        // call insertUser
        callback(true);
        return;
    }
    
    if (docs.length=1) {
        console.log('ONE USER! ID: '+checkUserId);
        callback(1);
        return;
    } 
    
    if (docs.length>1) {
        console.log('DUPES! OF ID: '+checkUserId+' IN AMOUNT OF '+docs.length);
        docs.forEach(element => { console.log(element); });
        callback(docs.length);
        return;
    }

    });
}

function insertUser(userId,firstName,lastName,userName){

var doc = {
    userId:   userId || '',
    firstName:firstName || '',
    lastName: lastName || '',
    userName: userName || ''
}; 

console.log(userId,' F: '+firstName,' L: '+lastName,' U: '+userName);
console.log(JSON.stringify(doc));
    dbUsers.insert(doc, function (err, newDoc) { 
    });
}

function ifChatExists(chatId){

}

bot.on('text', (msg) => {
    //  console.log(msg);
        dbMedia.find({}, function (err, docs) {
          docs.forEach(element => {
            if (msg.text.includes(element.trigger)) { //if no .mp4 then ok, else send doc
            ifUserExists(msg.from.id, function(result){
                          console.log('EXISTS? '+msg.from.id+'<- uid (yes/no)-> '+result);
            })
               //insertUser(msg.from.id, msg.from.first_name, msg.from.last_name, msg.from.username);
               // return msg.reply.text(msg.chat.id + msg.from.username + ifUserExists(msg.from.id));
            }
          });
        });
    });

    bot.start();

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
});