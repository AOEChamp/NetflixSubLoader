const path = require("path");
const fs = require("fs");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BannerPlugin = require("./plugins/BannerPlugin");

module.exports = (_env, argv) => {
  return {
    entry: {
      main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: `netflixsubloader.bundle${
        argv.mode === "development" ? ".dev" : ""
      }.js`,
    },
    plugins: [
      new BannerPlugin({
        banner: fs.readFileSync("./userscript.header.txt", "utf8"),
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
