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
    getSkills
} = require("../controllers/role");

// routes
router.post("/role", create);
router.get("/roles", list);
router.get("/role/:slug", read);
router.put("/role/:slug", update);
router.delete("/role/:slug", remove);
router.get("/role/skills/:_id", getSkills)

module.exports = router;