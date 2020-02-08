'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Form', 'createdAt', {
            allowNull: true,
            defaultValue: Sequelize.NOW,
            type: Sequelize.DATE
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Form');
    }
};
