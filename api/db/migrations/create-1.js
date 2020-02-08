'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Form', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Required: {
                type: Sequelize.TEXT,
                get: function() {
                    return JSON.parse(this.getDataValue('Required'));
                },
                set: function(value) {
                    this.setDataValue('Required', JSON.stringify(value));
                }
            },
            links: {
                type: Sequelize.TEXT,
                get: function() {
                    return JSON.parse(this.getDataValue('links'));
                },
                set: function(value) {
                    this.setDataValue('links', JSON.stringify(value));
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
