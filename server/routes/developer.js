import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
    currentdeveloper, developerProfile
} from "../controllers/developer";

router.get("/current-developer", requireSignin, currentdeveloper);
router.get("/developer-profile", requireSignin, developerProfile);

module.exports = router;
