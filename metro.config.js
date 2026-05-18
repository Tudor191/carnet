const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Allow Firebase and other ESM packages to be bundled correctly
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
