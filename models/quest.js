module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quest', {
        idx: { // 기본키 설정을 위한 껍데기(?)
            type: DataTypes.INTEGER(20),
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        quest_index: { // 실제로 사용할 문제의 번호 (5-1 처럼 사용 가능)
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        title: { // 문제 타이틀
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        gubun: { // 구분 (0 = 보기 테이블 참조   /   1 = 1 ~ 5 척도 선택형 문제)
            type: DataTypes.INTEGER(60),
            allowNull: false,
            defaultValue: 0,
        }
    }, {
        timestamps: false,
    });
};