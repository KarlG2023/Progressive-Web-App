module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,js,css}'
	],
	swDest: './src/service-worker.js',
	// swSrc: './src/service-worker.js'
	swSrc: './src/sw.js'
};