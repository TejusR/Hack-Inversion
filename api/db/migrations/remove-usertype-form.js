'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Form', 'userType');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Form');
    }
};
