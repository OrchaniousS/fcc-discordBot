const Discord = require("discord.js")
const mongoose = require('mongoose')
const mongoDB = require('mongodb')
const fetch = require('node-fetch')
const Database = require("@replit/database")
const stayOn = require('./server')

const db = new Database()
const client = new Discord.Client()

const JS = require('./models/jsAlgos'),
      RWD = require('./models/rwd'),
      FEdev = require('./models/FeDevLib')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.on('ready',()=>{
  // Run this once, Sets bot avatar.
  // client.user.setAvatar('https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/79/42/50/794250ce-41e0-7a0d-4145-68ea691cea51/mza_7816302939253877888.jpg/1200x1200bb.jpg');

  var temp = `Logged in as ${client.user.tag}`;
     console.log(temp)
})

client.on('message',async (msg) =>{
  if(msg.author.bot) return 

// Clearing chat [Limited to 99 messages only]
    if (msg.content.toLowerCase().startsWith("!clearchat")) {
        const clear = async()=> {
            msg.delete();
            const fetched = await msg.channel.messages.fetch({limit: 99});
            msg.channel.bulkDelete(fetched);
        }
        clear();
    }

  //Save: new keyword per collection
  if(msg.content.startsWith('$new')){
  var rwdKeyword = msg.content.split('$new rwd ')[1]
  var jsKeyword = msg.content.split('$new js ')[1]

  let rwdKW = new RWD({keywords:rwdKeyword})
  let jsKW = new JS({keywords:jsKeyword})

  rwdKW.save((err,savedKey)=>{
    if(err || !savedKey){console.log('failed saving.')}
    else{console.log('saved successfully.')}
  })

  jsKW.save((err,savedKey)=>{
    if(err || !savedKey){console.log('failed saving.')}
    else{console.log('saved successfully.')}
  })
  msg.channel.send('New keyword added.')
  }

  //   if(msg.content.startsWith('$del')){
  // index = parseInt(msg.content.split('$del ')[1])
  // deleteKeyWords(index)
  // msg.channel.send('New keyword deleted.')
  // }


// 1. Resposive Web Design
  await RWD.find(function(err,data){
        if(err || !data){
      console.log('Keywords for resposive web design are empty.')
      msg.reply('Sorry, we haven`t any links on this subject.')
    }else{
   data.some(item=>{
      if(msg.content.split(' ').includes(item['keywords'])){
    msg.reply(`Resposive Web Design Certification (300 Hours)
    https://www.freecodecamp.org/learn/responsive-web-design/
    `)
      }
    })
    }
  })

// 2. JavaScript Algorithms and Data Structures
  await JS.find(function(err,data){
    if(err || !data){
      console.log('Keywords for javascript are empty.')
      msg.reply('Sorry, we haven`t any links on this subject.')
    }else{
    data.some(item=>{
      if(msg.content.split(' ').includes(item['keywords'])){
    msg.reply(`JavaScript Algorithms and Data Structures Certification (300 Hours)
    https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
    `)
      }
    })
    }

  })

// 3. Front End Development Libraries



})

stayOn()
client.login(process.env.TOKEN)