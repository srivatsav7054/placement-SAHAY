const express = require("express");
const controller = require("../controllers/postController");

const router = express.Router();

router.get("/", controller.listPosts);
router.post("/", controller.createPost);
router.get("/:id", controller.getPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);
router.post("/:id/like", controller.toggleLike);

module.exports = router;
