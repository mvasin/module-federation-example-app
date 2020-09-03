const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (_, {mode}) => ({
  output: {
    publicPath:
      mode === "production"
        ? "https://module-federation-example-app.vercel.app/"
        : "http://localhost:8082/",
  },

  resolve: {
    extensions: [".jsx", ".js"],
  },

  devServer: {
    port: 8082,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      filename: "remoteEntry.js",
      remotes: {
        "library": "library@https://module-federation-example-component-library.vercel.app/remoteEntry.js"
      },
      exposes: {},
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
})
