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
} = require("../controllers/technologies");

// routes
router.post("/technologies", create);
router.get("/technologiess", list);
router.get("/technologies/:slug", read);
router.put("/technologies/:slug", update);
router.delete("/technologies/:slug", remove);

module.exports = router;