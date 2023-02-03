
export default function DataBase() {
    //DBとの接続
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = new Sequelize('adjust', 'admin', 'smnkisno1', {
        host: 'adjust-database.cfrxbhoksmto.us-east-1.rds.amazonaws.com',
        dialect: 'mysql'

    });

    //DBに情報を保存
    async function setDBAuthInfo(AuthInfo, pass) {
        sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    
        //ユーザテーブルへの保存
        const userTable = await User.bulkCreate([
            {sub: AuthInfo.id_token},
            {room: pass}
        ]);

        //トークンテーブルへの保存
        const tokenTable = await Token.bulkCreate([
            {}
        ]);
    }
}