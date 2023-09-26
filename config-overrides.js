const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@components": path.resolve(__dirname, "src/components"),
    "@containers": path.resolve(__dirname, "src/Containers"),
  };

  return config;
};
