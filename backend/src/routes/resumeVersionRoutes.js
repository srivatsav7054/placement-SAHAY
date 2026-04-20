const express = require("express");
const controller = require("../controllers/resumeVersionController");

const router = express.Router();

router.get("/", controller.listVersions);
router.post("/", controller.createVersion);
router.get("/:id", controller.getVersion);
router.put("/:id", controller.updateVersion);
router.delete("/:id", controller.deleteVersion);
router.post("/:id/analyze", controller.analyzeVersion);
router.get("/:id/download-pdf", controller.downloadPDF);

module.exports = router;
