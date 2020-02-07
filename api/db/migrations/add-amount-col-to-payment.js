'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Payments', 'amount', {
        type: Sequelize.FLOAT,
        defaultValue: 0
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};