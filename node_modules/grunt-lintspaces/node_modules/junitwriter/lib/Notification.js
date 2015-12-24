var
	merge = require('merge'),
	Node = require('./Node')
;

function Notification(nodeName, parent, message, type) {
	if (typeof message !== 'string') {
		throw new Error('Pass a message to the notification node');
	}

	if (typeof type !== 'string') {
		throw new Error('Pass a type to the notification node');
	}

	Node.call(this, nodeName, parent);
	this.setMessage(message);
	this.setType(type);
}

Notification.prototype = Object.create(Node.prototype);
merge(Notification.prototype, {

	setMessage: function(message) {
		this.node.attribute('message', message);
	},

	setType: function(type) {
		this.node.attribute('type', type);
	}

});

module.exports = Notification;
