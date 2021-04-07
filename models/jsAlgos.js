// 2. JavaScript Algorithms and Data Structures
// Link: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/

const mongoose = require('mongoose');

const jsSchema = new mongoose.Schema({
   keywords:String
});

module.exports = JS = mongoose.model('jsKeywords',jsSchema)