const express = require("express");
const controller = require("../controllers/commentController");

const router = express.Router();

router.get("/", controller.listComments);
router.post("/", controller.createComment);
router.get("/:id", controller.getComment);
router.put("/:id", controller.updateComment);
router.delete("/:id", controller.deleteComment);

module.exports = router;
