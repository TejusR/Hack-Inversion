'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            upiId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userType: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'student'
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
