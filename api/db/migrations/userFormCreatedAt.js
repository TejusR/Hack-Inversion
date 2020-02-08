'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('UserForm', 'createdAt', {
            allowNull: true,
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserForm');
    }
};
