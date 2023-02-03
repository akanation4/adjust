import Sequelize from 'sequelize';

export default function DataBase() {
    //DBとの接続
    
    function connectDB(){
    
        const { Sequelize, DataTypes } = require('sequelize');
        const sequelize = new Sequelize('adjust', 'react', 'smnkisno1', {
            host: 'adjust-database.cfrxbhoksmto.us-east-1.rds.amazonaws.com',
            dialect: 'mysql'

        });

        sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    //DBに情報を保存
    async function setDBAuthInfo(AuthInfo, pass) {
        
        //ユーザテーブルへの保存
        const userTable = await adjust.bulkCreate([
            {sub: AuthInfo.id_token},
            {room: pass}
        ]);

        //トークンテーブルへの保存
        const tokenTable = await Token.bulkCreate([
            {}
        ]);
    }

    //DBからsub,ステートの取得
    async function getDBAuthInfo() {

    }

    return (
        <div>data loading...</div>
    )
}