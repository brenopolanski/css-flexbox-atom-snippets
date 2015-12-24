var
	merge = require('merge'),
	Node = require('./Node')
;

function Testbase(nodeName, parent) {
	Node.call(this, nodeName, parent);
}

Testbase.prototype = Object.create(Node.prototype);
merge(Testbase.prototype, {

	incAttr: function(attr, amount) {
		var
			name = '_attr_' + attr,
			count = (this[name] || 0) + (amount || 1)
		;

		this[name] = count;
		this.node.attribute(attr, count);
		return this;
	},

	incDisabled: function(amount) {
		return this.incAttr('disabled', amount);
	},

	incErrors: function(amount) {
		return this.incAttr('errors', amount);
	},

	incFailures: function(amount) {
		return this.incAttr('failures', amount);
	},

	incTests: function(amount) {
		return this.incAttr('tests', amount);
	},

	setTime: function(seconds) {
		this.node.attribute('time', seconds);
	},

	setName: function(name) {
		this.node.attribute('name', name);
	},

	toString: function() {
		return this.node.toString();
	}

});

module.exports = Testbase;
