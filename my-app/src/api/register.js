import express from "express"
import {body, validationResult} from "express-validator"
import { registerEmployees} from "../controllers/employeeController.js"

// /myInfo_registerのルートを追加
const router = express.Router();

router.post(
    "/",
    // 文字形式や文字数、またそのほかのリクエストに関するバリデーション
    body('lastName')
        .notEmpty().withMessage('姓は必須です')
        .isString().withMessage("文字のみで入力が必須です")
        .isLength({min: 1, max: 40}).withMessage("40文字以内で入力してください"),
    body('firstName')
        .notEmpty().withMessage('名は必須です')
        .isString().withMessage("文字のみで入力が必須です")
        .isLength({min: 1, max: 40}).withMessage("40文字以内で入力してください"),
    body('address')
        .notEmpty().withMessage('住所は必須です')
        .isString().withMessage("文字のみで入力が必須です")
        .isLength({min: 1, max: 100}).withMessage("100文字以内で入力してください"),
    body('tel')
        .notEmpty().withMessage('電話番号は必須です')
        .isLength({ min: 10, max: 11 }).withMessage('電話番号は10〜11桁である必要があります'),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }
        next();
    },
    registerEmployees
)


export default router;