const mongoose = require('mongoose');

// 1. Resposive Web Design
const rsdSchema = new mongoose.Schema({keywords:String});
const RWD = mongoose.model('rsdKeywords',rsdSchema)

// 2. JavaScript Algorithms and Data Structures
const jsSchema = new mongoose.Schema({keywords:String});
const JS = mongoose.model('jsKeywords',jsSchema)

// 3. Front End Development Libraries
const feDevSchema = new mongoose.Schema({keywords:String});
const FEdev = mongoose.model('feDevKeywords',feDevSchema)

// 4. Data Visualization
const dataVisSchema = new mongoose.Schema({keywords:String});
const DV3 = mongoose.model('DataVisKeywords',dataVisSchema)

// 5. APIs and Microservices

// 6. Quality Assurance

// 7. Scientific Computing with Python

// 8. Data Analysis with Python

// 9. Information Security

// 10. Machine Learning with Python

// 11. Coding Interview Prep

module.exports = {RWD,JS,FEdev,DV3}