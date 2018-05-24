process.env.NODE_ENV = "development";
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const webpackConfigProd = require("./config/webpack.config.dev");

webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "report.html",
  })
);

require("./scripts/start");