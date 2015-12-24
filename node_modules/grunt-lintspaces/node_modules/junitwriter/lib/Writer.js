var
	mkdirp = require('mkdirp'),
	fs = require('fs'),
	path = require('path'),
	merge = require('merge'),
	builder = require('xmlbuilder'),

	Testsuites = require('./Testsuites')
;

// Format documentation @ http://llg.cubic.org/docs/junit/

function Writer() {
	this._root = new Testsuites();
}

merge(Writer.prototype, {

	getTestsuites: function() {
		return this._root;
	},

	addTestsuite: function(name) {
		return this._root.addTestsuite(name);
	},

	toString: function() {
		return '<?xml version="1.0" encoding="UTF-8"?>\n' + this._root.toString();
	},

	save: function(destination, callback) {
		var self = this;

		mkdirp(path.dirname(destination), function (error) {
			if (error) {
				if (typeof callback === 'function') {
					callback(error, self);
				}

				return;
			}

			fs.writeFile(destination, self.toString(), function(error) {
				if (typeof callback === 'function') {
					callback(error, self);
				}
			});
		});

	}

});

module.exports = Writer;
