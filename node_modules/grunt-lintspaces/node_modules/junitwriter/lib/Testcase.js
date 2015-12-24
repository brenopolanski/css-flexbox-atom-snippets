var
	merge = require('merge'),
	Node = require('./Node'),
	Text = require('./Text'),
	Notification = require('./Notification')
;

function Testcase(parent, name, classname) {
	if (typeof name !== 'string') {
		throw new Error('Pass a name to the testcase');
	}

	if (typeof classname !== 'string') {
		throw new Error('Pass a classname to the testcase');
	}

	this._parent = parent;
	this._errors = [];
	this._failures = [];

	Node.call(this, 'testcase', parent);
	this.setName(name);
	this.setClassname(classname);
}

Testcase.prototype = Object.create(Node.prototype);
merge(Testcase.prototype, {

	setName: function(name) {
		this.node.attribute('name', name);
	},

	setClassname: function(classname) {
		this.node.attribute('classname', classname);
	},

	setAssertions: function(assertions) {
		if (typeof assertions !== 'number') {
			throw new Error('Assertions must be type of number');
		}

		this.node.attribute('assertions', assertions);
	},

	setTime: function(seconds) {
		if (typeof seconds !== 'number') {
			throw new Error('Time must be type of number (in seconds)');
		}

		this.node.attribute('time', seconds);
	},

	addError: function(message, type) {
		var error = new Notification('error', this, message, type);
		this._errors.push(error);

		// Increment parents error count...
		this._parent.incErrors();
	},

	addFailure: function(message, type) {
		var failure = new Notification('failure', this, message, type);
		this._failures.push(failure);

		// Increment parents failure count...
		this._parent.incFailures();
	},

	setSystemOut: function(out) {
		if (!this._systemOut) {
			this._systemOut = new Text('system-out', this, out);
		} else {
			this._systemOut.setText(out);
		}
	},

	setSystemError: function(err) {
		if (!this._systemError) {
			this._systemError = new Text('system-err', this, err);
		} else {
			this._systemError.setText(err);
		}
	}

});

module.exports = Testcase;
