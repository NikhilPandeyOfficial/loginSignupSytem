function errorhandler(error, req, res, next){
    return res.status(error.status||500).json({
        error:{
            message: error.message||"Oops, something is going really wrong"
        }
    })
}

module.exports = errorhandler;