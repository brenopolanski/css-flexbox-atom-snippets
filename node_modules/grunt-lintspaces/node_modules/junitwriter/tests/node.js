var
	Node = require(process.cwd() + '/lib/Node')
;

exports['The Node'] = {
	'should create a xml node': function(test) {
		var node = new Node('foo');

		test.equals(node.toString(), '<foo/>', 'The node was not the expected one');
		test.done();
	},

	'should concat nodes': function(test) {
		var
			root = new Node('foo'),
			child = new Node('bar', root)
		;

		test.equals(root.toString(), '<foo><bar/></foo>', 'The node was not the expected one');
		test.equals(child.toString(), '<bar/>', 'The node was not the expected one');
		test.done();
	},

	'should throw an error when missing name': function(test) {
		test.throws(
			function() {new Node();},
			'A node expects a name as string',
			'The errow of a missing name param wasn\'t thrown'
		);
		test.done();
	},

	'should throw an error when name is not type of string': function(test) {
		test.throws(
			function() {new Node(true);},
			'A node expects a name as string',
			'The error of an incorrect type of the nodename wasn\'t thrown'
		);

		test.throws(
			function() {new Node(123);},
			'A node expects a name as string',
			'The error of an incorrect type of the nodename wasn\'t thrown'
		);

		test.done();
	},

	'should be removeable when possible': function(test) {
		var
			root = new Node('foo'),
			child = new Node('bar', root)
		;


		test.throws(function() {root.destroy();});

		child.destroy();
		test.equals(root.toString(), '<foo/>', 'The node was not the expected one');

		test.done();
	}
};
