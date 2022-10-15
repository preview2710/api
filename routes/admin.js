const router = require('express').Router();
const{ createBook } = require('../utils/admin')
const{ getRents } = require('../utils/rent')
const { userRegister, userLogin, userAuth,  checkRole } = require('../utils/auth')


router.post('/register-admin', async(req, res)=>{
    await userRegister(req.body, 'admin', res);
})

router.post('/login-admin', async(req, res)=>{
    await userLogin(req.body, 'admin', res);

})

router.post("/register-book", createBook, checkRole(['admin']), async(req, res)=>{
    await createBook(req.body, 'admin', res)
});

router.get('/', getRents)



module.exports = router