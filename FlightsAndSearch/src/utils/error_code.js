const ClientErrorCode =Object.freeze({ 
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
});

const ServerErrorCode = Object.freeze({
    INTERNAL_SERVER_ERROR:500,
    NOT_IMPLEMENTED:501,
    BAD_GATEWAY:502,
    SERVICE_UNAVAILABLE:503,
});

const SuccessCode = Object.freeze({
    OK:200,
    CREATED:201,
    ACCEPTED:202,
});
module.exports = {
    ClientErrorCode,
    ServerErrorCode,
    SuccessCode,
};