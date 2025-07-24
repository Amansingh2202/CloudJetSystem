const {Booking}=require('../models/index.js');
const {ValidationError, AppError} = require('../utils/errors/index.js');
const {StatusCodes} = require('http-status-codes');


class BookingRepository {
    async create(data){
        try{
                const booking =await Booking.create(data);
                return booking ;
        }
        catch(error){
               if(error.name='sequelizeValidationError'){
                throw new ValidationError(error)
        }
        throw  new AppError(
            'RepositoryError',
             'Connot create Booking',
             'there was an error while creating booking',
            StatusCodes.INTERNAL_SERVER_ERROR
                            
        );

        }
    }
   
    async update(bookingId,data){
        try{
            const booking= await  Booking.findByPk(bookingId)
            if(data.status)
            {
                booking.status=data.status;
            }
            await booking.save();
            return booking;
        }
        catch(error){
            throw  new AppError(
                'RepositoryError',
                 'Connot update Booking ',
                 'there was some issue updating booking , please try again later ',
                StatusCodes.INTERNAL_SERVER_ERROR
                                
            );
        }
    }

    async getById(bookingId) {
        try {
          const booking = await Booking.findByPk(bookingId);
          return booking;
        } catch (error) {
          throw new AppError(
            'RepositoryError',
            'Cannot fetch booking',
            'Error while retrieving booking',
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
      }
      




}

module.exports=BookingRepository;