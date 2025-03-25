const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: false,  // Disable source maps in production
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),

    // Load environment variables from .env file
    new Dotenv(),

    // Optionally, add DefinePlugin for other variables if needed
    // new webpack.DefinePlugin({
    //   'process.env.SOME_OTHER_VARIABLE': JSON.stringify(process.env.SOME_OTHER_VARIABLE),
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
