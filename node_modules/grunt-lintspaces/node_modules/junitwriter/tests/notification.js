var
	Node = require(process.cwd() + '/lib/Node'),
	Notification = require(process.cwd() + '/lib/Notification')
;

exports['The Notification'] = {
	'should create a xml node': function(test) {
		var
			node = new Node('root'),
			notification
		;

		notification = new Notification('notification', null, 'some message', 'any type');
		test.equals(
			notification.toString(),
			'<notification message="some message" type="any type"/>',
			'The notification was not the expected one'
		);

		notification = new Notification('notification', node, 'some message', 'any type');
		test.equals(
			node.toString(),
			'<root><notification message="some message" type="any type"/></root>',
			'The notification was not the expected one nested in the root node'
		);
		test.done();
	},

	'should fail when creating without correct message': function(test) {
		test.throws(
			function() { new Notification('notification', null); },
			'Pass a message to the notification node',
			'The notification didn\'t throw an error when not passing a message'
		);

		test.throws(
			function() { new Notification('notification', null, 1); },
			'Pass a message to the notification node',
			'The notification didn\'t throw an error when passing an incorrect type of message'
		);

		test.throws(
			function() { new Notification('notification', null, true); },
			'Pass a message to the notification node',
			'The notification didn\'t throw an error when passing an incorrect type of message'
		);

		test.done();
	},

	'should fail when creating without correct type': function(test) {
		test.throws(
			function() { new Notification('notification', null, 'some message'); },
			'Pass a type to the notification node',
			'The notification didn\'t throw an error when not passing a type'
		);

		test.throws(
			function() { new Notification('notification', null, 'some message', 1); },
			'Pass a type to the notification node',
			'The notification didn\'t throw an error when passing an incorrect type of type'
		);

		test.throws(
			function() { new Notification('notification', null, 'some message', true); },
			'Pass a type to the notification node',
			'The notification didn\'t throw an error when passing an incorrect type of type'
		);

		test.done();
	},

	'should set/change the message': function(test) {
		var notification = new Notification('notification', null, 'some message', 'any type');

		notification.setMessage('some other message');
		test.equals(
			notification.toString(),
			'<notification message="some other message" type="any type"/>',
			'The notification message was not changed'
		);

		test.done();
	},

	'should set/change the type': function(test) {
		var notification = new Notification('notification', null, 'some message', 'any type');

		notification.setType('any other type');
		test.equals(
			notification.toString(),
			'<notification message="some message" type="any other type"/>',
			'The notification type was not changed'
		);

		test.done();
	}
};
