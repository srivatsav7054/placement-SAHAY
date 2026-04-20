const express = require("express");
const controller = require("../controllers/resumeController");

const router = express.Router();

router.get("/", controller.listResumes);
router.post("/", controller.createResume);
router.post("/generate-from-job-description", controller.createResumeFromJobDescription);
router.post("/upload-placeholder", controller.uploadResumePlaceholder);
router.get("/highlights/:userId", controller.getResumeHighlights);
router.get("/:id", controller.getResume);
router.put("/:id", controller.updateResume);
router.delete("/:id", controller.deleteResume);

module.exports = router;
