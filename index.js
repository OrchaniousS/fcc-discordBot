const Discord = require("discord.js")
const mongoose = require('mongoose')
const mongoDB = require('mongodb')
const stayOn = require('./server')

// MongoDB models
const {RWD,JS,FEdev,DV3} = require('./models/zmodels.js')

// usable as alternative to fetch or axios packages for REST api requests.
// const fetch = require('node-fetch')

const client = new Discord.Client()

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
      !clearchat || !clear - clearing chat [Max limit:99 messages]
      
      [Show available keywords]
      $show 'X'- See keywords for the specified certifications.

      [Add new keywords per certification/subject]
      $new 'X' - 
      $new rwd - Insert new keywords for Responsive Web Design.
      $new js - Insert new keywords for JavaScript Algorithms and Data Structures.
      $new fed - Insert new keywords for Front End Development Libraries.
      $new dv3 - Insert new keywords for Data Visualization.
      $new apis - Insert new keywords for APIs and Microservices.
      $new qa - Insert new keywords for Quality Assurance.
      $new scpy - Insert new keywords for Scientific Computing with Python.
      $new dapy - Insert new keywords for Data Analysis with Python.
      $new isqa - Insert new keywords for Information Security.
      $new mlpy - Insert new keywords for Machine Learning with Python.
      $new cprep - Insert new keywords for Coding Interview Prep.
      `)}

  // Clearing chat [Limited to 99 messages only]
    if (msg.content.toLowerCase().startsWith("!clearchat")|| msg.content.toLowerCase().startsWith("!clear")) {
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
  var dv3Keyword = msg.content.split('$new dv3 ')[1]

  var rwdKW = new RWD({keywords:rwdKeyword})
  var jsKW = new JS({keywords:jsKeyword})
  var fedvKW = new FEdev({keywords:fedvKeyword})
  var dv3KW = new DV3({keywords:dv3Keyword})

  const saveKeyWord = (collection) =>
    collection.save((err,savedKey)=>{
      if(err || !savedKey){
        msg.channel.send('Error saving new key.')
        console.log('failed saving.')}
        else{
          msg.channel.send('New keyword added.')
          console.log('saved successfully.')
          }})
  
  if(rwdKW) return saveKeyWord(rwdKW)
  if(jsKW) return saveKeyWord(jsKW)
  if(fedvKW) return saveKeyWord(fedvKW)
  if(dv3KW) return saveKeyWord(dv3KW)
  }
  // END[Save: new keyword per collection]

  // Delete blank keywords

  if(msg.content.startsWith('$del')){
     RWD.find((err,data)=>{
        if (err || !data) return console.log(err)
        else{
          data.map(item=>console.log($objectToArray(item)))
        }
    })
  }

  // to add: Clear blank records without keywords
  // if(msg.content.startsWith('$del')){
  //   index = parseInt(msg.content.split('$del ')[1])
  //   deleteKeyWords(index)
  //   msg.channel.send('New keyword deleted.')
  // }

  // Show: Available keywords
  if(msg.content.startsWith('$show')){
    // const showAll = msg.content.match(/[^\$show$]/);
    const showRWD =  msg.content.split('$show rwd').length === 2
    const showJS =  msg.content.split('$show js').length === 2
    const showFED =  msg.content.split('$show fed').length === 2
    const showDV3 =  msg.content.split('$show dv3').length === 2

    let results = [];

    // Find keywords by model name
    const findKW = (x) => x.find((err,data)=>{
      if(err || !data) return console.log('No keyword found')
      else{return data.map((item,i)=>{
        if(item['keywords'] !== undefined){
            results.push(item['keywords'])     
        }
        if(i===data.length-1){
      // Switch case for msg.reply handle
    const model = x;
    switch(model){
      case RWD:
       msg.reply(`Responsive Web Design keywords are:${results}`)
       break
       case JS:
       msg.reply(`JavaScript Algorithms and Data Structures keywords are:${results}`)
       break
       case FEdev:
       msg.reply(`Front End Development Libraries keywords are:${results}`)
       break
       case DV3:
       msg.reply(`Data Visualization keywords are:${results}`)
       break
       default:
       msg.reply('There is no exisitng subject')
       break
    }
           }
      })}
      })
    if(showRWD){findKW(RWD)}
    if(showJS) {findKW(JS)} 
    if(showFED){findKW(FEdev)} 
    if(showDV3){findKW(DV3)} 
    
    // if(showAll){
    //   findKW(RWD)
    //   findKW(JS)
    //   findKW(FEdev)
    // }

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

// 4. Data Visualization
  await DV3.find(function(err,data){
    if(err || !data){msg.reply('Sorry, we haven`t any links on this subject.')}
    else{
    data.some(item=>{
      if(item['keywords']){
      item['keywords'] = item['keywords'].toLowerCase()
      if(msg.content.toLowerCase().split(' ').includes(item['keywords'])||
      msg.content.toLowerCase().includes(item['keywords'])){
    msg.reply(`Data Visualization Certification (300 Hours)
    https://www.freecodecamp.org/learn/data-visualization/`)
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