import express from "express"
import { getEmployee} from "../controllers/employeeController.js"

const router = express.Router()
router.get("/:id", getEmployee);

export default router