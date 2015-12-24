var
	Node = require(process.cwd() + '/lib/Node'),
	Writer = require(process.cwd() + '/lib/Writer'),
	Testcase = require(process.cwd() + '/lib/Testcase')
;

exports['The Testcase'] = {
	'should create a xml node': function(test) {
		var
			node = new Node('root'),
			testcase
		;

		text = new Testcase(null, 'testcasename', 'Testcase');
		test.equals(
			text.toString(),
			'<testcase name="testcasename" classname="Testcase"/>',
			'The testcase was not the expected one'
		);

		text = new Testcase(node, 'testcasename', 'Testcase');
		test.equals(
			node.toString(),
			'<root><testcase name="testcasename" classname="Testcase"/></root>',
			'The testcase was not the expected one nested in the root node'
		);
		test.done();
	},

	'should fail when creating without name': function(test) {
		test.throws(
			function() { new Text('text', null); },
			'Pass a name to the testcase',
			'The testcase didn\'t throw an error when not passing a name'
		);

		test.throws(
			function() { new Text('text', null, 1); },
			'Pass a name to the testcase',
			'The testcase didn\'t throw an error when passing an incorrect type of name'
		);

		test.throws(
			function() { new Text('text', null, true); },
			'Pass a name to the testcase',
			'The testcase didn\'t throw an error when passing an incorrect type of name'
		);

		test.done();
	},

	'should fail when creating without classname': function(test) {
		test.throws(
			function() { new Text('text', null, 'testcasename'); },
			'Pass a classname to the testcase',
			'The testcase didn\'t throw an error when not passing a classname'
		);

		test.throws(
			function() { new Text('text', null, 'testcasename', 1); },
			'Pass a classname to the testcase',
			'The testcase didn\'t throw an error when passing an incorrect type of classname'
		);

		test.throws(
			function() { new Text('text', null, 'testcasename', true); },
			'Pass a classname to the testcase',
			'The testcase didn\'t throw an error when passing an incorrect type of classname'
		);

		test.done();
	},

	'should set name': function(test) {
		var testcase = new Testcase(null, 'name', 'class');

		testcase.setName('other name');
		test.equals(
			testcase.toString(),
			'<testcase name="other name" classname="class"/>',
			'The name wasn\'t changed correctly'
		);
		test.done();
	},

	'should set classname': function(test) {
		var testcase = new Testcase(null, 'name', 'class');

		testcase.setClassname('other class');
		test.equals(
			testcase.toString(),
			'<testcase name="name" classname="other class"/>',
			'The classname wasn\'t changed correctly'
		);
		test.done();
	},

	'should set assertions': function(test) {
		var testcase = new Testcase(null, 'name', 'class');

		testcase.setAssertions(2);
		test.equals(
			testcase.toString(),
			'<testcase name="name" classname="class" assertions="2"/>',
			'The assertions are not set correctly'
		);
		test.done();
	},

	'should fail when set assertions of incorrect type': function(test) {
		var testcase = new Testcase(null, 'name', 'class');

		test.throws(
			function() {testcase.setAssertions('abc');},
			'Assertions must be type of number',
			'The testcase didn\'t throw an error when passing an incorrect type of assertions'
		);

		test.throws(
			function() {testcase.setAssertions(true);},
			'Assertions must be type of number',
			'The testcase didn\'t throw an error when passing an incorrect type of assertions'
		);

		test.done();
	},

	'should set time': function(test) {
		var testcase = new Testcase(null, 'name', 'class');

		testcase.setTime(200);
		test.equals(
			testcase.toString(),
			'<testcase name="name" classname="class" time="200"/>',
			'The time are not set correctly'
		);
		test.done();
	},

	'should fail when set time of incorrect type': function(test) {
		var testcase = new Testcase(null, 'name', 'class');

		test.throws(
			function() {testcase.setTime('abc');},
			'Time must be type of number (in seconds)',
			'The testcase didn\'t throw an error when passing an incorrect type of time'
		);

		test.throws(
			function() {testcase.setTime(true);},
			'Time must be type of number (in seconds)',
			'The testcase didn\'t throw an error when passing an incorrect type of time'
		);

		test.done();
	},

	'should add errors': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			testcase = suite.addTestcase('testname', 'class.name')
		;

		testcase.addError('some message', 'some type');
		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><error message="some message" type="some type"/></testcase>',
			'The error is missing'
		);

		testcase.addError('some other message', 'some other type');
		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><error message="some message" type="some type"/><error message="some other message" type="some other type"/></testcase>',
			'The other error is missing'
		);

		test.done();
	},

	'should add failures': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			testcase = suite.addTestcase('testname', 'class.name')
		;

		testcase.addFailure('some message', 'some type');
		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><failure message="some message" type="some type"/></testcase>',
			'The failure is missing'
		);

		testcase.addFailure('some other message', 'some other type');
		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><failure message="some message" type="some type"/><failure message="some other message" type="some other type"/></testcase>',
			'The other failure is missing'
		);

		test.done();
	},

	'should set system-out': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			testcase = suite.addTestcase('testname', 'class.name')
		;

		testcase.setSystemOut('some system out');
		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><system-out>some system out</system-out></testcase>',
			'The system out is not displayed correctly'
		);

		test.done();
	},

	'should update system-out': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			testcase = suite.addTestcase('testname', 'class.name')
		;

		testcase.setSystemOut('some system out');
		testcase.setSystemOut('some another system out');

		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><system-out>some another system out</system-out></testcase>',
			'The system out is not displayed correctly'
		);

		test.done();
	},

	'should set system-err': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			testcase = suite.addTestcase('testname', 'class.name')
		;

		testcase.setSystemError('some system error');
		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><system-err>some system error</system-err></testcase>',
			'The system error is not displayed correctly'
		);

		test.done();
	},

	'should update system-err': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			testcase = suite.addTestcase('testname', 'class.name')
		;

		testcase.setSystemError('some system error');
		testcase.setSystemError('some another system error');

		test.equal(
			testcase.toString(),
			'<testcase name="testname" classname="class.name"><system-err>some another system error</system-err></testcase>',
			'The system error is not displayed correctly'
		);

		test.done();
	}
};
