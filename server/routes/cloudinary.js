import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", upload);
router.post("/removeimage", remove);

module.exports = router;
