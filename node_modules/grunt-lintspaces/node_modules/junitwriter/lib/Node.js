var
	merge = require('merge'),
	builder = require('xmlbuilder')
;

function Node(nodeName, parent) {
	var node;

	if (typeof nodeName !== 'string') {
		throw new Error('A node expects a name as string');
	}

	if (parent === undefined || parent === null) {
		node = builder.create(nodeName);
		node.dec('1.0', 'UTF-8', true);
	} else if (parent instanceof Node) {
		node = parent.node.ele(nodeName);
	} else {
		throw new Error('The given parent node is not an instance of Node or undefined');
	}

	this.node = node;
}

merge(Node.prototype, {

	constructor: Node,

	destroy: function() {
		this.node.remove();
	},

	toString: function() {
		return this.node.toString();
	}

});

module.exports = Node;
