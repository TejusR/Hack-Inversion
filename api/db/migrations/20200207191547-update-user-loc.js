'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'latitude', {
        type: Sequelize.DOUBLE,
        allowNull: true
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};