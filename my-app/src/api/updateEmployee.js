import express from "express"
import { updateEmployee } from "../controllers/employeeController.js";
import { body, validationResult } from "express-validator"


const router = express.Router();

router.post(
    "/",
    body("lastName")
        .notEmpty().withMessage("性は必須です")
        .isString().withMessage("文字のみです")
        .isLength({min: 0, max: 40}).withMessage("40文字以内です"),
    body("firstName")
        .notEmpty().withMessage("性は必須です")
        .isString().withMessage("文字のみです")
        .isLength({min: 0, max: 40}).withMessage("40文字以内です"),
    body("address")
        .notEmpty().withMessage("性は必須です")
        .isString().withMessage("文字のみです")
        .isLength({min: 0, max: 100}).withMessage("100文字以内です"),
    body("tel")
        .notEmpty().withMessage("性は必須です")
        .isString().withMessage("文字のみです")
        .isLength({min: 0, max: 40}).withMessage("電話番号は10〜11桁である必要があります"),
    body("position")
        .notEmpty().withMessage("性は必須です")
        .isString().withMessage("文字のみです"),
    (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            res.status(400).json(error)
        }
        next();
    },
    updateEmployee
);

export default router