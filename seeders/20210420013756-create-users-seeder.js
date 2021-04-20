'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('users', [
        {
          name: 'Wiby Fabian Rianto',
          profession: 'Frontend Developer',
          role: 'admin',
          email: 'wibyfabian08@gmail.com',
          password: await bcrypt.hash('masterofcad', 10),
          created_at: new Date,
          updated_at: new Date
        },
        {
          name: 'Vina Aulya Anggraeni',
          profession: 'Backend Developer',
          role: 'student',
          email: 'vinaaulya@gmail.com',
          password: await bcrypt.hash('masterofcad', 10),
          created_at: new Date,
          updated_at: new Date
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
  }
};