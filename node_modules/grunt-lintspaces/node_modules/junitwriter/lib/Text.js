var
	merge = require('merge'),
	Node = require('./Node')
;

function Text(nodeName, parent, text) {
	if (typeof text !== 'string') {
		throw new Error('Pass a text to the text node');
	}

	Node.call(this, nodeName, parent);
	this._text = null;
	this.setText(text);
}

Text.prototype = Object.create(Node.prototype);
merge(Text.prototype, {

	setText: function(text) {
		this.node.children.forEach(function(child) {
			child.remove();
		});
		this.appendText(text);
	},

	appendText: function(text) {
		this.node.text(text);
	}

});

module.exports = Text;
