const {StatusCodes}=require('http-status-codes')


class ServiceError extends Error {
    constructor(message="something Went Wrong ", explantion='Service layer error',statusCodes = StatusCodes.INTERNAL_SERVER_ERROR) {
        super();
        this.message= message;
        this.explantion=explantion;
        this.name-'ServiceError'
        this.statusCodes = statusCodes;
       
    }
}
module.exports = ServiceError;