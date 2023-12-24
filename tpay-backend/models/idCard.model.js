const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    idnumber: String
})

module.exports = mongoose.model('Card', CardSchema)