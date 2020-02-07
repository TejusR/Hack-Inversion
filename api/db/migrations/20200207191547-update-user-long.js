'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'longitude', {
        type: Sequelize.DOUBLE,
        allowNull: true
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};