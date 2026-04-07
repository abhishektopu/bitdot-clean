const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "vm": false,
    "process": require.resolve("process/browser"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer")
  });
  config.resolve.fallback = fallback;

  // Add alias to fix ESM "fully specified" issue with canvg
  config.resolve.alias = {
    ...config.resolve.alias,
    "process/browser": require.resolve("process/browser.js"),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  // Allow importing without extensions in ESM modules
  config.module = config.module || {};
  config.module.rules = (config.module.rules || []).map(rule => {
    if (rule.resolve) {
      rule.resolve.fullySpecified = false;
    }
    return rule;
  });

  // Disable fullySpecified for all JS/MJS files
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
