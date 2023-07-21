const {constants} = require('../constants');
// VALIDAITON_ERROR,UNAUTHORIZED,FORBIDDEN,NOT_FOUND,SERVER_ERROR
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode || 500;
    console.log(statusCode, constants.NOT_FOUND);
    switch (statusCode) {
        case constants.VALIDAITON_ERROR:
            res.json({title:"Vaildation Failed",error:err.message,stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized",error:err.message,stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"forbidden error",error:err.message,stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found", message:err.message,stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"server Error",error:err.message,stackTrace: err.stack});
            break;
        default:
            res.json({"message":"all good"});
            break;
    }
   
}

module.exports = errorHandler;