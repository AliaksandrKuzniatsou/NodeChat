const webpackConfig = {
    //context: __dirname + "/src",
    entry: __dirname + "/public/src/js/index.js",
    output: {
        path: __dirname + "/public/dist/js",
        filename: "bundle.js"
    },
    module: {
	  loaders: [
		    {
		      loader: 'babel?presets[]=react,presets[]=es2015',
              exclude: /(node_modules|bower_components)/
		    }
  		]
	}
}

module.exports = webpackConfig;