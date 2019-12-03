const getDataStorePath = env => env.path || "./logs.json";
const timeStamp = env => {
  const stubbedDate = new Date(env.date);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  return hasValidStubbedDate ? stubbedDate : new Date();
};
exports.timeStamp = timeStamp;
exports.getDataStorePath = getDataStorePath;
