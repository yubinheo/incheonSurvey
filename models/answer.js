module.exports = (sequelize, DataTypes) => {
    return sequelize.define('answer', {
        idx: { // 답변 번호
            type: DataTypes.INTEGER(20),
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        user_idx: { // 유저 번호 (퀴즈 작성시 인적 정보 작성란, users 테이블의 idx 참고)
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        quest_index: { // 문제(보기) 번호 (문제 번호와 보기, 답변의 매칭을 위함)
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        select: { // 선택한 보기의 번호
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};