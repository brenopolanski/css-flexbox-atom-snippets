var
	merge = require('merge'),
	Node = require('./Node')
;

function Properties(parent) {
	Node.call(this, 'properties', parent);

	this._properties = {};
}

Properties.prototype = Object.create(Node.prototype);
merge(Properties.prototype, {

	add: function(name, value) {
		if (typeof name !== 'string') {
			throw new Error('A property name must be type of string');
		}

		if (!value) {
			throw new Error('A property value must be defined');
		}

		if (this._properties[name]) {
			throw new Error('Can not add this property twice');
		}

		this._properties[name] = this.node.ele('property', {
			name: name,
			value: value
		});
	},

	remove: function(name) {
		if (this._properties[name]) {
			this._properties[name].remove();
			this._properties[name] = undefined;
			delete(this._properties[name]);
		}
	},

	update: function(name, value) {
		if (this._properties[name]) {
			this._properties[name].attribute('value', value);
		}
	},

	count: function() {
		return Object.keys(this._properties).length;
	}

});

module.exports = Properties;
