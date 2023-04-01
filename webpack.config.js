const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.ts',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'messenger.bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }],
							['@babel/preset-typescript', { targets: "defaults" }]
						]
					},
				},
				],
				exclude: /(node_modules)/
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
			{
				test: /\.pcss$/,
				use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				},
				'postcss-loader'
				]
			},
			{
				test: /\.hbs$/,
				use: [
					{
						loader: "handlebars-loader",
						options: {
							helperDirs: path.resolve(__dirname, "./src/handlebars-helpers")
						}
					}
				]
			}
		]
	},
	plugins: [new HtmlWebpackPlugin(
		{
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html',
        }
	)],
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		historyApiFallback: true
	}
};
