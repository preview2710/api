const Rent = require('../models/rent')
const admin = require('../models/admin')
const moment = require('moment')
const user = require('../models/user')

const createRent = async (req,res)=>{
    const newRent = new Rent(req.body)
    const book = await admin.findOne({title : req.body.title})
    if(book.stock === 1){
        return res.status(200).json({
            message : 'User can not rent'
        })
    }
    const stock = book.stock - 1
    await admin.findOneAndUpdate({title : book.title},{stock : stock})
    newRent.returnBook = moment(new Date()).add(3, 'days')

    
try {
    await newRent.save()
    return res.status(200).json({
        detail: newRent,
        message : 'complete'
    })
} catch (err) {
    console.log(err)
    return res.status(404).json({
        message: 'Unable to rent',
        success: false
    })
    }
}

const searchRent = async (req, res) => {
    console.log('req.body',req.body)
        let data = await Rent.find(
            {
                '$or':[
                    {username:{$regex:req.params.key}},
                    {title:{$regex:req.params.key}}
                ]
            }
        )
        res.send(data)
}

const getRents = async (req,res,next)=>{

    try {
        const rents = await Rent.find()
            res.status(200).json(rents)
        } catch (err) {
            return res.status(404).json({
                message:'No valid'
            })
    }
}

const returnRent = async (req,res,next)=>{
    const logs = await Rent.findOne({username: req.body.username, title: req.body.title}).lean().exec()
     if(logs === null) return res.status(404).json(false)
     { 
        //const turn = logs.returnBook - logs.borrow 
        const a = moment(new Date())
        const w = a - logs.returnBook
        const d = w * (1.17 * 10**-8)
        let s 
        if(d < 0){
            s = 0
        }else{
            s = d * 20
        }
        const book = await admin.findOne({title : req.body.title})
        console.log((Math.floor(s)))
        console.log(a)
        console.log((Math.floor(d)))
        const stock = book.stock + 1
        await admin.findOneAndUpdate({title : book.title},{stock : stock})
        console.log(stock)
        return res.status(200).json({
            price : (Math.floor(s)),
            message : 'successfully'
        })
     }  
 }



module.exports={
    createRent,
    searchRent,
    getRents,
    returnRent
}