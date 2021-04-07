const express = require('express');

const server =  express();

server.all('/',(req,res)=>{
  var status;
  if(res.statusCode===200){
  status = 'Online'
  }else{
    status = 'Offline'
  }
  res.send(`Bot Status: ${status}`)
})

function stayOn(){
  server.listen(3000,()=>{
    console.log('Server is online.')
  })
}

module.exports = stayOn