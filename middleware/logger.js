const moment =require('moment'); 

//middleware function
const middleware_logger = (req,res,next) =>{
    console.log("You are in middleware First");
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(`The time of getting this req is ${moment().format()}`);
    //console.log(`The time of getting this req is ${moment().format('l')}`);
    //console.log(`Protocol is ${req.protocol} and hostname is ${req.hostname} and pathname is ${req.pathname} and href ${req.href}`)
    //this next is for the next middleware function
   next(); 
}

module.exports = middleware_logger;