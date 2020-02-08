'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserForm', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            formid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Form',
                    key: 'id'
                }
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            submitted: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserForm');
    }
};
