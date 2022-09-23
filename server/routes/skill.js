import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controller
const {
    create,
    read,
    update,
    remove,
    list,
} = require("../controllers/skill");

// routes
router.post("/skill", create);
router.get("/skills", list);
router.get("/skill/:slug", read);
router.put("/skill/:slug", update);
router.delete("/skill/:slug", remove);

module.exports = router;