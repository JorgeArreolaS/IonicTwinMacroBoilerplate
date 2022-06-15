const fs = require('fs')

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  const babelLoaderRule = config.module.rules
    .find( i => "oneOf" in i )['oneOf']
    .find( i => 
      i['loader']?.includes("babel-loader") && 
      i['include']?.includes("src") 
    )
  const babelPlugins = babelLoaderRule.options.plugins

  babelPlugins.push("babel-plugin-twin")
  babelPlugins.push("babel-plugin-macros")
  babelPlugins.push("@emotion/babel-plugin")

  babelLoaderRule.options.presets[0][0] = "@babel/preset-react"
  const presetReactConfig = babelLoaderRule.options.presets[0][1]
  presetReactConfig.importSource = "@emotion/react"

  babelLoaderRule.options.presets.push("@babel/preset-typescript")

  // fs.writeFileSync('config.json', JSON.stringify(config, null, 2))
  return config;
}
