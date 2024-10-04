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
export { registerEmployees }

// get関係のコントローラ

// 実際にはSQLより現在の社員のデータを持ってくる
// async function getEmployees() {
//     const connection = await mysql.createConnection(dbConfig);
//     const [rows] = await connection.query('SELECT id, lastName, firstName, address, tel FROM employee_table')
//     await connection.end();
//     return rows;
// }

// // 社員の一覧にpage.jsから来たデータを、社員の一覧に加える
// export default async function register (req, res) {
//     try {
//         const employees = await getEmployees();
//         const newEmployees = req.body
//         employees.push(newEmployees);
//         console.log(newEmployees)
//         res.status(201).json({ message: '社員情報を取得しました', newEmployees });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'サーバーエラー' });
//     }
// }

