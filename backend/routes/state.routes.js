import { Router } from "express"
import { createState,  getStates, getStateWithBlogs } from "../controllers/state.controller.js"

import { verifyJWT } from "../middlewares/verifyJWT.js"
import { verifyAdmin } from "../middlewares/verifyAdmin.js"

const router = Router()

router.post("/create", verifyJWT, verifyAdmin, createState)

// router.get("/country/:countryId", getStates)

router.get("/:slug", getStateWithBlogs)

export default router
