import {validationResult} from "express-validator"
import mysql from "mysql2/promise"
import dbConfig from "../config/dbConfig.js"

// (req, res)に対してどのような操作を実施するかというのを記述

// 社員の一覧に追加のリクエストが来た時に、SQLにデータを追加する
async function registerEmployees (req, res) {
    const newEmployee = req.body;
    const connection = await mysql.createConnection(dbConfig)
    try {
        const query = 'INSERT INTO employee_table (lastName, firstName, address, tel) VALUES (?, ?, ?, ?)';
        // excuteメソッドとは、query(SQLクエリ(SQLにさせたい命令))を実行させるメソッド、今回はconnectionというTableに対して、上記のクエリを実行し配列に格納する
        await connection.execute(query, [
            newEmployee.lastName,
            newEmployee.firstName,
            newEmployee.address,
            newEmployee.tel
        ])
        res.status(201).json({ message: '社員が登録されました'});
    } catch(error) {
        // データベースでの登録で何かしらのエラーが発生したとき
        console.log("データベースエラー", error);
        res.status(500).json({ message: 'データベースの登録に失敗しました' });
    } finally {
        await connection.end();
    }
}

// 社員一覧を取得する
async function getAllEmployees(req, res) {
    const connection = await mysql.createConnection(dbConfig);
    try{
        const [rows] = await connection.query('SELECT * FROM employee_table')
        res.status(200).json(rows)
    }catch(err){
        console.log("データベースエラー", err);
        res.status(500).json({ message: 'データベースの取得に失敗しました'})
    }finally{
        await connection.end();
    }
}


async function getEmployee (req, res){
    const id = parseInt(req.params.id);
    // req.paramsだけだと、{id: ...}とオブジェクト形式で返される
    const connection = await mysql.createConnection(dbConfig);
    try{
        const [rows] = await connection.query(`SELECT * FROM employee_table where id=?`,[id])
        
        if(rows.length !== 1){
            return res.status(404).json({message:`社員が見つかりません`})
        }
        res.status(200).json(rows[0])
    }catch(err){
        res.status(500).json({message: "データベースの取得に失敗しました"})
    }finally{
        await connection.end();
    }
}

export { registerEmployees , getAllEmployees , getEmployee}