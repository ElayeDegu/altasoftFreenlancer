import express from "express";

const router = express.Router();

// middleware
import { requireSignin, isDeveloper } from "../middlewares";

// controllers
import { uploadImage, removeImage, profile, read, list, addProject, addEducation, addExperience } from "../controllers/profile";

// image
router.post("/profile/upload-image", uploadImage);
router.post("/profile/remove-image", removeImage);

// profile
router.post("/profile", requireSignin, isDeveloper, profile);
router.get("/profile/:slug", read);
router.get("/profiles", list);
router.post("/profile/project/:slug/:developerId", requireSignin, addProject);
router.post("/profile/education/:slug/:developerId", requireSignin, addEducation);
router.post("/profile/experience/:slug/:developerId", requireSignin, addExperience);

module.exports = router;
