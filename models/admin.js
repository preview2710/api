const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    title:  {
        type : String,
        required:true,
        unique:true
    },
    category : {
        type : String,
        required : true
    },
   stock:{
        type : Number,
        required : true
    },
},
    {timestamps:true}
)


module.exports = mongoose.model('Admin', AdminSchema)