const express = require("express");
const controller = require("../controllers/achievementController");

const router = express.Router();

router.get("/", controller.listAchievements);
router.post("/", controller.createAchievement);
router.get("/:id", controller.getAchievement);
router.put("/:id", controller.updateAchievement);
router.delete("/:id", controller.deleteAchievement);

module.exports = router;
