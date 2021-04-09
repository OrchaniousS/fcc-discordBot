const Discord = require("discord.js")
const mongoose = require('mongoose')
const mongoDB = require('mongodb')
const Database = require("@replit/database")
const stayOn = require('./server')

// usable as alternative to fetch or axios packages for REST api requests.
// const fetch = require('node-fetch')

const db = new Database()
const client = new Discord.Client()

// MongoDB models
const RWD = require('./models/rwd.js')
const JS = require('./models/jsAlgos.js')
const FEdev = require('./models/FeDevLib.js')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Discord client initialized
client.on('ready',()=>{
  // Run this once -> Sets bot avatar.
  // client.user.setAvatar('https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/79/42/50/794250ce-41e0-7a0d-4145-68ea691cea51/mza_7816302939253877888.jpg/1200x1200bb.jpg');

  var temp = `Logged in as ${client.user.tag}`;
     console.log(temp)
})

// Discord client message event
client.on('message',async (msg) =>{
  if(msg.author.bot) return 

// Help command
  if(msg.content.toLowerCase().startsWith('!help')){
      msg.reply(`
      Available commands
      !help - for help and other commands.
      !clearchat - clearing chat [Max limit:99 messages]

      [Show available keywords]
      $show - See keywords for all the certifications.

      [Add new keywords per certification/subject]
      $new rwd - Insert new keywords for Responsive Web Design.
      $new js - Insert new keywords for JavaScript Algorithms and Data Structures.
      $new fed - Insert new keywords for Front End Development Libraries.
      $new dv - Insert new keywords for Data Visualization.
      $new apis - Insert new keywords for APIs and Microservices.
      $new qa - Insert new keywords for Quality Assurance.
      $new scpy - Insert new keywords for Scientific Computing with Python.
      $new dapy - Insert new keywords for Data Analysis with Python.
      $new isqa - Insert new keywords for Information Security.
      $new mlpy - Insert new keywords for Machine Learning with Python.
      $new cprep - Insert new keywords for Coding Interview Prep.
      `)
  }

  // Clearing chat [Limited to 99 messages only]
    if (msg.content.toLowerCase().startsWith("!clearchat")) {
        const clear = async()=> {
            msg.delete();
            const fetched = await msg.channel.messages.fetch({limit: 99});
            msg.channel.bulkDelete(fetched);
        }
        clear();
    }

  // Start[Save: new keyword per collection]
  if(msg.content.startsWith('$new')){

  var rwdKeyword = msg.content.split('$new rwd ')[1]
  var jsKeyword = msg.content.split('$new js ')[1]
  var fedvKeyword = msg.content.split('$new fed ')[1]

  var rwdKW = new RWD({keywords:rwdKeyword})
  var jsKW = new JS({keywords:jsKeyword})
  var fedvKW = new FEdev({keywords:fedvKeyword})

  const saveKeyWord = (collection) =>
    collection.save((err,savedKey)=>{
      if(err || !savedKey){console.log('failed saving.')}
        else{console.log('saved successfully.')}})
  

  if(rwdKW) return saveKeyWord(rwdKW)

  if(jsKW) return saveKeyWord(jsKW)

  if(fedvKW) return saveKeyWord(fedvKW)

  msg.channel.send('New keyword added.')
  }
  // END[Save: new keyword per collection]

  // to add: Clear blank records without keywords
  // if(msg.content.startsWith('$del')){
  //   index = parseInt(msg.content.split('$del ')[1])
  //   deleteKeyWords(index)
  //   msg.channel.send('New keyword deleted.')
  // }

  
  // Show: Available keywords
  if(msg.content.startsWith('$show')){
    var arrKeys = [];
    var responsiveWD = await RWD.find(function(err,data){
      if(err||!data) return err
      else{return data.map(item=>{if(item.keywords){return arrKeys.push(item.keywords)}}
      )}
    })
    msg.reply(`Responsive Web Design: ${[...arrKeys]}`)
  }


// 1. Resposive Web Design
  await RWD.find(function(err,data){
    if(err || !data){msg.reply('Sorry, we haven`t any links on this subject.')}
    else{
    data.some(item=>{
      if(item['keywords']){
      if(msg.content.toLowerCase().split(' ').includes(item['keywords'])||
      msg.content.toLowerCase().includes(item['keywords'])){
        msg.reply(`Resposive Web Design Certification (300 Hours)
          https://www.freecodecamp.org/learn/responsive-web-design/`)
      }
      }
    })
    }
  })

// 2. JavaScript Algorithms and Data Structures
  await JS.find(function(err,data){
    if(err || !data){msg.reply('Sorry, we haven`t any links on this subject.')}
    else{
    data.some(item=>{
      if(item['keywords']){
      item['keywords'] = item['keywords'].toLowerCase()
      if(msg.content.toLowerCase().split(' ').includes(item['keywords']) ||
      msg.content.toLowerCase().includes(item['keywords'])){
    msg.reply(`JavaScript Algorithms and Data Structures Certification (300 Hours)
    https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/`)
      }
      }
    })
    }
  })

// 3. Front End Development Libraries
  await FEdev.find(function(err,data){
    if(err || !data){msg.reply('Sorry, we haven`t any links on this subject.')}
    else{
    data.some(item=>{
      if(item['keywords']){
      item['keywords'] = item['keywords'].toLowerCase()
      if(msg.content.toLowerCase().split(' ').includes(item['keywords'])||
      msg.content.toLowerCase().includes(item['keywords'])){
    msg.reply(`Front End Development Libraries Certification (300 Hours)
    https://www.freecodecamp.org/learn/front-end-libraries/`)
      }
      }
    })
    }
  })


})


// Keep bot online thru 'uptimerobot' website
stayOn()

// Login to discord client
client.login(process.env.TOKEN)