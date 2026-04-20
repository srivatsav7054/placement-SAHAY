const buildMockAnalysis = () => {
  const score = Math.floor(Math.random() * 31) + 60;

  return {
    jobMatchScore: score,
    comments: [
      "Project bullets are clear and easy to scan.",
      "Resume structure is strong for an ATS-friendly format.",
      "Keywords align well with general software roles.",
    ],
    errors: [
      "Add measurable impact to at least one experience entry.",
    ],
    warnings: [
      "Consider adding more job-specific keywords from the description.",
      "Certificates section can be reordered if it is more relevant than achievements.",
    ],
  };
};

const weatherData = {
  city: "Hyderabad",
  temperatureCelsius: 31,
  condition: "Partly Cloudy",
  humidity: 52,
  windKph: 14,
  updatedAt: "2026-04-19T09:00:00.000Z",
};

module.exports = {
  buildMockAnalysis,
  weatherData,
};
