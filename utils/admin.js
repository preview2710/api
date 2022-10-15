const Admin = require('../models/admin')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
let password = "admin123";

const seedAdmin = ()=>{
    User.findOne({role:"admin"}, (err, admin) =>{
       if (err) throw err
       if(admin) {
            return "admin account already exists"
        }
        User.create({
            username :"admin01",
            role:"admin"
        },(err, user) =>{
            if(err) throw err
            bcrypt.genSalt(10, (err, salt) =>{
                if(err) throw err
                bcrypt.hash(password, salt, (err, hash) =>{
                    if(err) throw err
                    user.password = hash,
                    user.save((err, savedUser) => {
                        if(err) throw err
                       return "admin account created"
                    })
                })
            })
        })
    })
}

const createBook = async (req,res,)=>{
    const newBook = new Admin(req.body)
    const user = await User.findOne({username: req.body.username})
    if(user.role !== 'admin'){
        return res.status(403).json({
            message: 'Your can not create.',
            success: false
            });
    }
        const savedBook = await newBook.save()
        res.status(200).json(savedBook)
    }

module.exports={
    seedAdmin,
    createBook
}
