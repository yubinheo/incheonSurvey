module.exports = (sequelize, DataTypes) => {
    return sequelize.define('select', {
        idx: { // 보기 번호
            type: DataTypes.INTEGER(20),
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        quest_index: { // 문제 번호 (문제 번호와 보기의 매칭을 위함)
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        comment: { // 보기 텍스트
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        type: { // 보기 타입 (번호에 따라 최종 결과 매칭)
            type: DataTypes.INTEGER(20),
            allowNull: false,
        }
    }, {
        timestamps: false,
    });
};