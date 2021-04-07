// 1. Resposive Web Design
// Link: https://www.freecodecamp.org/learn/responsive-web-design/
const mongoose = require('mongoose');

const rsdSchema = new mongoose.Schema({
   keywords:String
});

module.exports = RWD = mongoose.model('rsdKeywords',rsdSchema)