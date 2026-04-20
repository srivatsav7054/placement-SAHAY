const asyncHandler = require("../utils/asyncHandler");
const { weatherData } = require("../utils/mockData");

const getWeather = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: weatherData,
  });
});

module.exports = {
  getWeather,
};
