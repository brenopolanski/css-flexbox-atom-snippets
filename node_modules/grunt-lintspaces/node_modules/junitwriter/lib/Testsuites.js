var
	merge = require('merge'),

	Testbase = require('./Testbase'),
	Testsuite = require('./Testsuite')
;

function Testsuites() {
	this._suites = [];
	this._showIds = false;
	Testbase.call(this, 'testsuites');
}

Testsuites.prototype = Object.create(Testbase.prototype);
merge(Testsuites.prototype, {

	addTestsuite: function(name) {
		var suite = new Testsuite(name, this, {
			id: this._suites.length,
			showId: this._showIds
		});
		this._suites.push(suite);

		return suite;
	},

	showIds: function() {
		this._showIds = true;
		this._suites.forEach(function(suite) {
			suite.showId();
		});
	},

	hideIds: function() {
		this._showIds = false;
		this._suites.forEach(function(suite) {
			suite.hideId();
		});
	}

});

module.exports = Testsuites;
