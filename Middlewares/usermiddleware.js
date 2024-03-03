const  sampleMiddileware=(req,res,next)=>{
    console.log("Middleware is on act!!");
    next()
}

module.exports= sampleMiddileware;