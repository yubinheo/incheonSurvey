module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        idx: { // 유저 번호
            type: DataTypes.INTEGER(20),
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        age: { // 나이
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        school: { // 재학중인 학교명
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: { // 이메일
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone: { // 전화번호
            type: DataTypes.INTEGER(70),
            allowNull: false,
        },
        ip: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};