const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const resumeVersionRoutes = require("./routes/resumeVersionRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const todoRoutes = require("./routes/todoRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const utilityRoutes = require("./routes/utilityRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Placement SAHAY API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/resume-versions", resumeVersionRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/utilities", utilityRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
