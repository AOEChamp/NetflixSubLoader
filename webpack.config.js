const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BannerPlugin = require("./plugins/BannerPlugin");

module.exports = (_env, argv) => {
  const filename = `netflixsubloader${
    argv.mode === "development" ? ".dev" : ""
  }.user.js`;
  const port = 9000;
  return {
    entry: {
      main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: filename,
      environment: {
        module: true,
      },
    },
    plugins: [
      new BannerPlugin({
        banner: fs.readFileSync("./userscript.header.txt", "utf8"),
        filename: filename,
        port: port,
      }),
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        h: ["preact", "h"],
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: port,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /yarn/,
          use: ["babel-loader"],
        },
      ],
    },
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      },
    },
  };
};
