import express from "express";
import cors from "cors"
import registerRouter from "./api/register.js"
import getAllRouter from "./api/getAllEmployees.js";
import  getRouter  from "./api/getEmployee.js";
import updateRouter from "./api/updateEmployee.js"
const app = express();

app.use(cors());

app.use(express.json())

// /employees/myInfo_registerにfetchでアクセスがある場合にregisterRouterが実行される
app.use("/employees/myInfo_register", registerRouter)

app.use("/employees/list", getAllRouter )

app.use("/employees",getRouter)

app.use("/employees/update", updateRouter)

app.listen(4000, () => {
    console.log(`サーバーが http://localhost:4000 で起動しました`);
})