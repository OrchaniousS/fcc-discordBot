// 3. Front End Development Libraries
// Link: https://www.freecodecamp.org/learn/front-end-libraries/

const mongoose = require('mongoose');

const feDevKeywords = new mongoose.Schema({
   keywords:String
});

module.exports = FEdev = mongoose.model('feDevKeywords',feDevKeywords)