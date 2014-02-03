(function(module) {
	"use strict";

	var Sockets = module.parent.require('./socket.io/index'),
		SocketModules = module.parent.require('./socket.io/modules'),
		SocketAdmin = module.parent.require('./socket.io/admin'),
		fs = require('fs'),
		path = require('path'),
		winston = require('winston');

	var Designer = {}

	Designer.init = function() {
		SocketAdmin.designer = {};
		SocketAdmin.designer.save = function(socket, data, callback) {
			var savePath = path.join(__dirname, 'public/compiled.css');

			fs.writeFile(savePath, data, function (err) {
				if (err) {
					winston.err(err);
				}

				if (callback) {
					callback({status: !!!err});
				}
			});
		}
	};

	Designer.addScripts = function(scripts, callback) {
		return scripts.concat([
				'plugins/public/lib/designer.js',
				'plugins/public/vendor/ace/ace.min.js',
				'plugins/public/vendor/ace/worker-css.js',
				'plugins/public/vendor/ace/mode-css.js'
			]);
	};

	module.exports = Designer;
}(module));