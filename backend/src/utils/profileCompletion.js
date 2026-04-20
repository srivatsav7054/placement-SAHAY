const completionFields = [
  "firstName",
  "lastName",
  "email",
  "headline",
  "phone",
  "location",
  "bio",
];

const calculateProfileCompletion = (user) => {
  const completedCount = completionFields.reduce((count, field) => {
    const value = user[field];
    return value ? count + 1 : count;
  }, 0);

  return Math.round((completedCount / completionFields.length) * 100);
};

module.exports = {
  completionFields,
  calculateProfileCompletion,
};
