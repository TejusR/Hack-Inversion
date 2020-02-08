'use strict';
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        'Payment',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            orderId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: false
            },
            fromId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            toId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            amount: {
                type: DataTypes.FLOAT,
                defaultValue: 0
            },
            paid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            paymentInit: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            paymentEnd: {
                type: DataTypes.DATE,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW()
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {}
    );
    Payment.associate = function(models) {
        // associations can be defined here
    };
    return Payment;
};
