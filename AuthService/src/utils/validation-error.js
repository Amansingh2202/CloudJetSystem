const AppErrors = require('./error-handler');
const {StatusCodes} = require('http-status-codes');


class ValidationError extends AppErrors {
    constructor(error){
        let errorName=error.name;
        let explanation=[];
        error.errors.forEach((err)=>{
                this.explantion.push(err.message)
        })
    
    super(
        errorName,
        'Not able to validate the data sent in the request',
        explantion,
        StatusCodes.BAD_REQUEST,
    )
}
}
module.exports = ValidationError;