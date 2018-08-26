// /p/:idの場合はservice-workerがcacheを返さないようにカスタマイズする
module.exports = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  staticFileGlobs: [
    'build/index.html',
    'build/static/css/**.css',
    'build/static/js/**.js',
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  runtimeCaching: [
    {
      urlPattern: /\/p\//,
      handler: 'networkOnly',
    },
  ],
}
