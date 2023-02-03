import React from 'react';


export default function DataBase() {
    //DBとの接続
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = new Sequelize('adjust', 'admin', 'smnkisno1', {
        host: 'adjust-database.cfrxbhoksmto.us-east-1.rds.amazonaws.com',
        dialect: 'mysql'

    });
    
    equelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

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
}