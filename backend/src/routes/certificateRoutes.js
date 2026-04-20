const express = require("express");
const controller = require("../controllers/certificateController");

const router = express.Router();

router.get("/", controller.listCertificates);
router.post("/", controller.createCertificate);
router.get("/:id", controller.getCertificate);
router.put("/:id", controller.updateCertificate);
router.delete("/:id", controller.deleteCertificate);

module.exports = router;
