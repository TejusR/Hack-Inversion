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
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            submitted: {
                type: Sequelize.TEXT,
                get: function() {
                    if (this.getDataValue('submitted')) return JSON.parse(this.getDataValue('submitted'));
                    return null;
                },
                set: function(value) {
                    this.setDataValue('submitted', JSON.stringify(value));
                },
                allowNull: true
            },
            completed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
