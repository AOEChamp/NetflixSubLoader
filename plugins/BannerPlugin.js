const ConcatSource = require("webpack-sources").ConcatSource;
const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");

class BannerPlugin {
  constructor(options) {
    this.options = options || {};
    this.banner = options.banner;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("BannerPlugin", (compilation) => {
      compilation.hooks.afterOptimizeAssets.tap("BannerPlugin", () => {
        for (const chunk of compilation.chunks) {
          for (const file of chunk.files) {
            if (!ModuleFilenameHelpers.matchObject(this.options, file)) {
              continue;
            }
            compilation.updateAsset(
              file,
              (old) => new ConcatSource(this.banner, "\n", old)
            );
          }
        }
      });
    });
  }
}

module.exports = BannerPlugin;
