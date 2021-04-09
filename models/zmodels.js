// export const RWD = require('./rwd.js')
// export const JS = require('./jsAlgos.js')
// export const FEdev = require('./FeDevLib.js')
const mongoose = require('mongoose');

// 1. Resposive Web Design
const rsdSchema = new mongoose.Schema({
   keywords:String
});

module.exports = RWD = mongoose.model('rsdKeywords',rsdSchema)

// 2. JavaScript Algorithms and Data Structures
// Link: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
const jsSchema = new mongoose.Schema({
   keywords:String
});

module.exports = JS = mongoose.model('jsKeywords',jsSchema)

// 3. Front End Development Libraries
// Link: https://www.freecodecamp.org/learn/front-end-libraries/
const feDevSchema = new mongoose.Schema({
   keywords:String
});

module.exports = FEdev = mongoose.model('feDevKeywords',feDevSchema)

// 4.

// 5.


// export { default as RWD } from './rwd.js'
// export { default as JS } from './jsAlgos.js'
// export { default as FEdev } from './FeDevLib.js'