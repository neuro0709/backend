import express from "express";
import cors from "cors"
import registerRouter from "./api/register.js"

const app = express();

app.use(cors());

app.use(express.json())

// /employees/myInfo_registerにfetchでアクセスがある場合にregisterRouterが実行される
app.use("/employees", registerRouter)


// // /employee/で社員一覧を取得しようとしたとき
// app.post("/employees/", getAllRouter)
// // //employees/myInfoで社員情報を取得しようとしたとき
// app.post("/employees/myInfo", getRouter)
// // /employee/myinfo_registerで社員情報を更新しようとしたとき
// app.post("/employees/myInfo_register", updataRouter)


app.listen(4000, () => {
    console.log(`サーバーが http://localhost:4000 で起動しました`);
})