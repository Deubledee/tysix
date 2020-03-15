module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'cms/**/*',
    'src/**/*',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /\/data\//,
      handler: 'fastest'
    }
  ]
};
