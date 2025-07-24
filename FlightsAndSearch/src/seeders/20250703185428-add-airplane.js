'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


     
    
      await queryInterface.bulkInsert('Airplanes', [{
        modelNumber: 'Boeing 737',
        capacity: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ,
    {
        modelNumber: 'Airbus A320',
        capacity: 180,
        createdAt: new Date(),  
        updatedAt: new Date()
      }
    ,
    {
        modelNumber: 'Boeing 777',
        capacity: 550,
        createdAt: new Date(),  
        updatedAt: new Date()
      }
      ,{
        modelNumber: 'Airbus A380',
        capacity: 850,
        createdAt: new Date(),  
        updatedAt: new Date()
      }
   
    
    ], {});
 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
