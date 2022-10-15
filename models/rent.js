const mongoose = require('mongoose')


const RentSchema = new mongoose.Schema({
    username :{
                type : String,
                required : true
            } ,
    title :{
                type : String,
                required : true
            },
    borrow :{
                type : Date,
                required : true,
                default : Date.now()
    },
    returnBook :{
                type : Date,
                required : true
    }
})

module.exports = mongoose.model('Rent', RentSchema)