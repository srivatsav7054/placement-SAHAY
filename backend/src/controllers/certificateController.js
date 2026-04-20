const Certificate = require("../models/Certificate");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const listCertificates = asyncHandler(async (req, res) => {
  const filter = req.query.userId ? { userId: req.query.userId } : {};
  const certificates = await Certificate.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: certificates });
});

const createCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.create(req.body);
  res.status(201).json({ success: true, data: certificate });
});

const getCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }
  res.json({ success: true, data: certificate });
});

const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }
  res.json({ success: true, data: certificate });
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) {
    throw new ApiError(404, "Certificate not found");
  }
  res.json({ success: true, message: "Certificate deleted successfully" });
});

module.exports = {
  listCertificates,
  createCertificate,
  getCertificate,
  updateCertificate,
  deleteCertificate,
};
