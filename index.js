const Discord = require("discord.js")
const fetch = require('node-fetch')
const Database = require("@replit/database")

const db = new Database()
const client = new Discord.Client()

const resposiveWebDesign = ['responsive','web design','web','design','basic css','css','flex','flexbox','grid','html5','basic and html5','Applied Accessibility','Accessibility','Applied Visual Design','Visual Design'];

const javaScriptandAlgos = ['js','javascript','js algorithms','javascript algorithms','algorithms','Data Structures','JavaScript Data Structures', 'Java Script Data Structures','Vanilla JS','vanilla'];

db.get('javaScriptandAlgos')
.then(javaScriptandAlgos=>{
  if(!javaScriptandAlgos || javaScriptandAlgos.length <1 ){
  db.set('javaScriptandAlgos',javaScriptandAlgos)
  }
})

function updateKeyWords(keyWord){
  db.get('javaScriptandAlgos').then(javaScriptandAlgos=>{
    javaScriptandAlgos.push([keyWord])
    db.set('javaScriptandAlgos',javaScriptandAlgos)
  })
}

function deleteKeyWords(keyWord){
  db.get('javaScriptandAlgos').then(javaScriptandAlgos=>{
    if(javaScriptandAlgos.length > index){
      javaScriptandAlgos.splice(index,1)
    db.set('javaScriptandAlgos',javaScriptandAlgos)
    }
  })
}

client.on('ready',()=>{
     console.log(`Logged in as ${client.user.tag}`)
})

client.on('message',(msg)=>{
  if(msg.author.bot) return

  if(msg.content.startsWith('$new')){
  keyword = msg.content.split('$new ')[1]
  updateKeyWords(keyword)
  msg.channel.send('New keyword added.')
  }

    if(msg.content.startsWith('$del')){
  index = parseInt(msg.content.split('$del ')[1])
  deleteKeyWords(index)
  msg.channel.send('New keyword deleted.')
  }

  if(javaScriptandAlgos.some(item=>msg.content.split(' ').includes(item))){
    db.get('javaScriptandAlgos').then(javaScriptandAlgos=>{
    msg.reply(`JavaScript Algorithms and Data Structures Certification (300 Hours)
    https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
    `)
    })
  }

  if(resposiveWebDesign.some(item=>msg.content.split(' ').includes(item))){
    msg.reply(`Resposive Web Design Certification (300 Hours)
    https://www.freecodecamp.org/learn/responsive-web-design/
    `)
  }

})

client.login(process.env.TOKEN)