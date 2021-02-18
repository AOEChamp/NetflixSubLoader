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
        const bannerParts = this.banner.split("// ==/UserScript==");
        const proxyBanner =
          bannerParts[0] +
          `// @require http://localhost:${this.options.port}/${this.options.filename}\n` +
          "// ==/UserScript==" +
          bannerParts[1];
        compilation.emitAsset(
          "devproxy.user.js",
          new ConcatSource(proxyBanner)
        );
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
