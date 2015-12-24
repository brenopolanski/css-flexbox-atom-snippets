var
	Properties = require(process.cwd() + '/lib/Properties')
;

exports['The Properties'] = {
	'should create an empty node': function(test) {
		var props = new Properties();

		test.equals(
			props.toString(),
			'<properties/>',
			'The node was not the expected one'
		);
		test.done();
	},

	'should add new properties': function(test) {
		var props = new Properties();
		props.add('foo', 123);
		props.add('bar', 'baz');

		test.equals(
			props.toString(),
			'<properties><property name="foo" value="123"/><property name="bar" value="baz"/></properties>',
			'The properties wasn\'t created correctly'
		);
		test.done();
	},

	'should not add a unique property twice ': function(test) {
		var props = new Properties();
		props.add('foo', 123);

		test.throws(
			function() {props.add('foo', 789);},
			'Can not add this property twice',
			'The property seems to be added twice'
		);
		test.done();
	},

	'should fail when adding with incorrect type of name': function(test) {
		var props = new Properties();

		test.throws(
			function() {props.add();},
			'A property name must be type of string',
			'A property can be added without using a name'
		);
		test.throws(
			function() {props.add(1);},
			'A property name must be type of string',
			'A property can be added by using a value which is not type of string'
		);
		test.throws(
			function() {props.add(true);},
			'A property name must be type of string',
			'A property can be added by using a value which is not type of string'
		);

		test.done();
	},

	'should remove a property': function(test) {
		var props = new Properties();
		props.add('foo', 123);
		props.remove('foo');

		test.equals(
			props.toString(),
			'<properties/>',
			'The properties are not empty after removing them'
		);
		test.done();
	},

	'should update a property': function(test) {
		var props = new Properties();
		props.add('foo', 123);
		props.update('foo', 'bar');

		test.equals(
			props.toString(),
			'<properties><property name="foo" value="bar"/></properties>',
			'The property wasn\'t updated correctly'
		);
		test.done();
	},

	'should not update a not existing property': function(test) {
		var props = new Properties();
		props.add('foo', 123);
		props.update('bar', 'baz');

		test.equals(
			props.toString(),
			'<properties><property name="foo" value="123"/></properties>',
			'An update was performed unexpectedly'
		);
		test.done();
	},

	'should return amount of properties': function(test) {
		var props = new Properties();
		props.add('foo', 123);
		props.add('bar', 'baz');

		test.equals(
			props.count(),
			2,
			'The properties are not counted correctly'
		);
		test.done();
	}
};
