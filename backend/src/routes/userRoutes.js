const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

router.get("/", controller.listUsers);
router.post("/", controller.createUser);
router.post("/sync-clerk", controller.syncClerkUser);
router.get("/by-clerk-id/:clerkUserId", controller.getUserByClerkId);
router.put("/by-clerk-id/:clerkUserId", controller.updateUserByClerkId);
router.get("/:userId/dashboard-summary", controller.getDashboardSummary);
router.get("/:id", controller.getUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
