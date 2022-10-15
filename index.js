const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const {success, error} = require('consola');
const {connect} = require('mongoose');
const passport = require('passport')
const {DB, PORT} = require('./config');


const app = express();


app.use(bp.json());
app.use(cors());
app.use(passport.initialize());


app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'))

//const {seedAdmin} = require ('./utils/admin')
//console.log(seedAdmin())

const startApp = async () =>{
try {
    await connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    
    success({
        message:`Successfully connected with the Database  \n${DB}`, 
        badge: true 
    })
    app.listen(PORT, ()=> 
    success({
        message:`Server started on PORT ${PORT}`, 
        badge: true 
    })
);
} catch (err) {
    
    error({
        message: `Unable to connect with \n${err}`,
        badge: true
        });
        startApp()
    }
};
startApp();
