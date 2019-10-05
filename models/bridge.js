module.exports = function(sequelize, DataTypes) {
    const bridge = sequelize.define("Bridge", {
        userID: DataTypes.INTEGER,
        activityID: DataTypes.INTEGER,
        completeByDate: DataTypes.STRING,
        completed: DataTypes.BOOLEAN

    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
       
    return bridge
}