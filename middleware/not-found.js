const {StatusCodes}=require('http-status-codes')
const {NotFound}=require('../errors')
const notFoundHandler=( req,res)=>{
res.status(StatusCodes.NOT_FOUND).send( 'Route does not exist')
}


module.exports=notFoundHandler