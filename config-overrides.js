const {
  alias,
  configPaths
} = require('react-app-rewire-alias')
const addRewireScssLoader = require("react-app-rewire-scss-loaders");
const path = require("path");
const webpack = require("webpack");
const rewireVendorSplitting = require('./plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const aliasMap = configPaths('./tsconfig.base.json') // or jsconfig.paths.json
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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

    const isDev = config.mode == 'development';

    alias(aliasMap)(config);
    scssLoader(['./src/sass/_shared.scss'])(config, env);
    // config = rewireVendorSplitting(config, env);
    console.log(config)

    // config.optimization = {

    // };

    // config.optimization.splitChunks = {
    //   cacheGroups: {
    // default: false,
    // vendor: {
    //   test: /[\\/]node_modules[\\/](react|react-dom|css-loader|react-router-dom)[\\/]/,
    //   name: 'vendor',
    //   chunks: 'all',
    // },
    // commons: {
    //   test: /[\\/]node_modules[\\/]/,
    //   // cacheGroupKey here is `commons` as the key of the cacheGroup
    //   name(module, chunks, cacheGroupKey) {
    //     const moduleFileName = module
    //       .identifier()
    //       .split('/')
    //       .reduceRight((item) => item);
    //     const allChunksNames = chunks.map((item) => item.name).join('~');
    //     return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
    //   },
    //   chunks: 'all',
    // },
    // byModuleTypeGroup: {
    //   test(module) {
    //     return module.type === 'javascript/auto';
    //   },
    //   name(module, chunks, cacheGroupKey) {
    //     const moduleFileName = module
    //       .identifier()
    //       .split('/')
    //       .reduceRight((item) => item);
    //       console.log("---", cacheGroupKey)
    //       console.log("moduleFileName", moduleFileName)
    //       // console.log("---", chunks)
    //     const allChunksNames = chunks.map((item) => item.name).join('~');
    //     return '[name]';
    //   },
    // },
    //   }
    // }

    if (process.argv.includes('--bundle-report')) {
      config.plugins.push(
        new BundleAnalyzerPlugin()
      )
    }
    config.plugins.push(
      // new webpack.optimize.ModuleConcatenationPlugin()
    )

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