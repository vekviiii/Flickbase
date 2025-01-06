const passport = require('passport');
const { ApiError } = require('./apiError');
const httpStatus = require('http-status');
const {roles} = require('../config/roles')


const verify = (req,res,resolve,reject,rights) => async(err,user)=> {
    if(err || !user )
    {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, "Sorry, not authorized"))
    }

    req.user = user;

    if(rights.length)
    {
        const action = rights[0]; // create any read any...
        const resource = rights[1]; // profiles, articles, test
        const permission = roles.can(req.user.role)[action](resource)
        if(!permission.granted)
        {
            return reject(new ApiError(httpStatus.FORBIDDEN, "Sorry, you don't have enough right"))
        }
        res.locals.permission = permission
    }

    resolve()
}


const auth = (...rights) => async(req,res,next) =>{

    return new Promise((resolve,reject)=>{
        passport.authenticate('jwt',{session:false},verify(req,res,resolve,reject,rights))(req,res,next)
    })
    .then(()=>next())
    .catch((err)=>next(err))

}
module.exports = auth
