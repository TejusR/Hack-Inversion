'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'updatedAt', {
        allowNull: true,
        type: Sequelize.DATE
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};