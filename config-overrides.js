const {
  alias,
  configPaths
} = require('react-app-rewire-alias')
const addRewireScssLoader = require("react-app-rewire-scss-loaders");
const path = require("path");
const webpack = require("webpack");
const rewireVendorSplitting = require('./plugin');

const aliasMap = configPaths('./tsconfig.base.json') // or jsconfig.paths.json

const scssLoader = (items) => {
  const _items = items.map((e) => path.resolve(__dirname, e));
  return addRewireScssLoader("sass-resources-loader", {
    resources: _items,
  });
}

// const multipleEntry = require('react-app-rewire-multiple-entry')([{
//     entry: 'src/boot/boot.js',
//     // if [template] is empty, Default value: `public/index.html`
//     // template: 'public/index.html',
//     outPath: 'public/index.html'
//     // Visit: http[s]://localhost:3000/public/login.html
// }]);


module.exports = {
  webpack: function override(config, env) {
    // multipleEntry.addMultiEntry(config);
    alias(aliasMap)(config);
    scssLoader(['./src/sass/_shared.scss'])(config, env);
    // config = rewireVendorSplitting(config, env);
    console.log(config)

    // if (!config.optimization) {
    //   config.optimization = {};
    // }
    // config.optimization.splitChunks.chunks = { chunks: 'all', name: false };
    // config.optimization = {
    //   // Instruct webpack not to obfuscate the resulting code
    //   minimize: false,
    //   splitChunks: {
    //     minSize: 0,
    //     chunks: 'all',
    //     minChunks: 4,
    //     cacheGroups: {
    //       // Disabling this cache group.
    //       default: false,
    //     },
    //   },
    // },
    // config.plugins.push(
    //  new webpack.optimize.SplitChunksPlugin({
    //     name: 'vendor'
    //   }) 
    // )
    // config.optimization.splitChunks.name = false;
    console.log(config.optimization)

    return config;
  },
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);
      // console.log(config)
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
}