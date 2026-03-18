import { Router } from "express"

import {

createMenu,
getMenu,
updateMenu,
deleteMenu

} from "../controller/menu.controller.js"

import authMiddleware from "../middleware/auth.middleware.js"

const router = Router()

router.get("/",getMenu)

router.post("/",authMiddleware,createMenu)

router.put("/:id",authMiddleware,updateMenu)

router.delete("/:id",authMiddleware,deleteMenu)

export default router