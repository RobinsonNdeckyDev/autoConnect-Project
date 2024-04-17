const nodeExternals = require("webpack-node-externals");

module.exports = {
  externals: [
    nodeExternals({
      allowlist: ["sweetalert2", "aos"],
    }),
  ],
  // Autres configurations Webpack...
};
