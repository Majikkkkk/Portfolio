const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.watchFolders = [];
config.resolver.unstable_enablePackageExports = false;
config.resolver.useWatchman = false;

module.exports = config;
