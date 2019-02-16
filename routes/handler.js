const User = require("./user");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next){
    try{
        console.log(req.body);
        let user = await User.create(req.body);
        let {id, username} = user;
        let token = jwt.sign({
            id,
            username
        },process.env.SECRET_KEY);
        
        return res.status(200).json({
            id,
            username,
            token
        });
    }catch(err){
        if(err.code === 11000){
            err.message = "Sorry, that id or username is already taken";
        }
        return next({
            status : 400,
            message : err.message
        }); 
    }
}

exports.signin = async function(req, res, next){
    try{
        let user = await User.findOne({
            email: req.body.email
        });
        let {id, username } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username
            },process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                token
            });
        }else{
            return next({
                status: 400,
                message: "Invalid email or password"
            });
        }
    }catch(err){
            return next({
                status:400,
                message: "Invalid email or password"
            });
    }
}
