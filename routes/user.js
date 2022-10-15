const router = require('express').Router();
const { createRent, searchRent, returnRent  } = require('../utils/rent')
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require('../utils/auth')


router.post('/register-user', async(req, res)=>{
    await userRegister(req.body, 'user', res);

})

router.post('/login-user', async(req, res)=>{
    await userLogin(req.body, 'user', res);

})

router.get('/user-protected', userAuth,checkRole(['user']), async(req, res)=>{
    return res.json(serializeUser(req.user));
 
})

router.post('/rentBook', createRent, async(req, res)=>{
    await createRent(req.body, 'user', res)
}) 

router.get('/search/:key', searchRent, async(req, res)=>{
    await searchRent(req.body,'user',res)
})

router.post('/returnBook', returnRent, checkRole(['user']), async(req, res)=>{
    await returnRent(req.body, 'user', res)
})

module.exports = router