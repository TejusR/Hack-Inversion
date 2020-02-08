'use strict';
module.exports = (sequelize, Sequelize) => {
    const UserForm = sequelize.define(
        'UserForm',
        {
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
            }
        },
        {}
    );
    UserForm.associate = function(models) {
        // associations can be defined here
    };
    return UserForm;
};
