const mongoose = require('mongoose');

// 1. Resposive Web Design
const rsdSchema = new mongoose.Schema({keywords:String});
RWD = mongoose.model('rsdKeywords',rsdSchema)

// 2. JavaScript Algorithms and Data Structures
const jsSchema = new mongoose.Schema({keywords:String});
const JS = mongoose.model('jsKeywords',jsSchema)

// 3. Front End Development Libraries
const feDevSchema = new mongoose.Schema({keywords:String});
const FEdev = mongoose.model('feDevKeywords',feDevSchema)
module.exports = {RWD,JS,FEdev}

// 4.

// 5.
