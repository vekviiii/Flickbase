const httpStatus = require('http-status')
const { authService, emailService } = require('../services')

const authController = {
    async register(req, res, next){
        try
        {
            const { email, password } = req.body
            const user = await authService.createUser(email, password)
            const token = await authService.genAuthToken(user)


            await emailService.registerEmail(email, user)


            res.cookie('x-access-token', token)
            .status(httpStatus.CREATED).send({
                user,
                token
            })

        }catch(error)
        {
            next(error)
        }
    },

    async signin(req,res,next)
    {
        try {
            const { email, password } = req.body
            const user = await authService.signInWithEmailAndPassword(email, password)
            const token = await authService.genAuthToken(user)

            console.log("(server) user", user)
            console.log("(server) token", token)
            
            res.cookie('x-access-token', token).send({
                user,
                token
            })

        } catch (error) {
            next("Here is the error", error)
        }
    },

    async isauth(req,res,next)
    {
        res.json(req.user);
    },

    async testrole(req,res,next)
    {
        res.json({ok:'yes'});
    }
}

module.exports = authController