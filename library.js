(function(module) {
	"use strict";

	var Designer = {}

	Designer.addScripts = function(scripts, callback) {
		return scripts.concat([
				'plugins/public/lib/designer.js',
				'plugins/public/vendor/ace/ace.min.js'
			]);
	};

	module.exports = Designer;
}(module));