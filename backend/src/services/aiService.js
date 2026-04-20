const { buildMockAnalysis } = require("../utils/mockData");

const analyzeResume = async (resumeJSON, jobDescription) => {
  const hasAiConfig = Boolean(process.env.AI_API_KEY);

  if (!hasAiConfig) {
    return buildMockAnalysis();
  }

  return {
    jobMatchScore: 88,
    comments: [
      "AI integration placeholder is configured. Replace this branch with your provider call.",
    ],
    errors: [],
    warnings: [
      "External AI provider call is not implemented yet.",
    ],
    resumeJSON,
    jobDescription,
  };
};

module.exports = {
  analyzeResume,
};
