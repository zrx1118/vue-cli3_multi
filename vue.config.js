let glob = require("glob");
let merge = require("webpack-merge");

let page = function() {
  let entryHtml = glob.sync("src/views" + "/*/*.html");
  let obj = {};
  entryHtml.forEach(filePath => {
    let filename = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf("."));
    let entryname = filePath.substring(0, filePath.lastIndexOf("."));
    let conf = {
      entry: entryname + '.ts',
      template: filePath,
      filename: filename + ".html",
      chunks: ["chunk-vendors", "chunk-common", filename],
    };
    if (process.env.NODE_ENV === "production") {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: "dependency"
      });
    }
    obj[filename] = conf
  });
  return obj;
};

module.exports = {
  publicPath: '/', // 官方要求修改路径在这里做更改，默认是根目录下，可以自行配置
  outputDir: 'dist', //标识是打包哪个文件
  pages: page(),
  productionSourceMap: false,
  devServer: {
    open: true, // 项目构建成功之后，自动弹出页面
    host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
    port: 8081, // 端口号，默认8080
    https: false, // 协议
    hotOnly: false // 没啥效果，热模块，webpack已经做好了
  }
}