var
	Writer = require(process.cwd() + '/lib/Writer'),
	Testsuite = require(process.cwd() + '/lib/Testsuite'),
	Testcase = require(process.cwd() + '/lib/Testcase')
;

exports['The Testsuite'] = {
	'should throw an error when instantiated without passing a name to the constructor': function(test) {
		test.throws(
			function() { new Testsuite(); },
			'A testsuite requires a name',
			'The constructor didn\'t fire any error'
		);

		test.done();
	},

	'should throw an error when instantiated without passing a parent testsuites option to the constructor': function(test) {
		test.throws(
			function() { new Testsuite('some name'); },
			'A testsuite requires a parent node',
			'The constructor didn\'t fire any error'
		);

		test.done();
	},

	'should contain a name and tests amount initially': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"/>',
			'The testcase not correct formatted'
		);

		test.done();
	},

	'should add testcases': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			caseA = suite.addTestcase('testA', 'TestA'),
			caseB = suite.addTestcase('testB', 'TestB')
		;

		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="2"><testcase name="testA" classname="TestA"/><testcase name="testB" classname="TestB"/></testsuite>',
			'The testcases are not added'
		);
		test.ok(
			caseA instanceof Testcase,
			'The returned case is not an instance of Testcase'
		);
		test.ok(
			caseB instanceof Testcase,
			'The returned case is not an instance of Testcase'
		);
		test.notEqual(
			caseA,
			caseB,
			'The two testcases are the same instance'
		);

		test.done();
	},

	'should increase disabled amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.incDisabled();
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" disabled="1"/>',
			'The initial disabled amount is not correct'
		);

		suite.incDisabled(2);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" disabled="3"/>',
			'The increased disabled amount is not correct'
		);

		test.done();
	},

	'should increase errors amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.incErrors();
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" errors="1"/>',
			'The initial errors amount is not correct'
		);

		suite.incErrors(2);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" errors="3"/>',
			'The increased errors amount is not correct'
		);

		test.done();
	},

	'should increase failures amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.incFailures();
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" failures="1"/>',
			'The initial failures amount is not correct'
		);

		suite.incFailures(2);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" failures="3"/>',
			'The increased failures amount is not correct'
		);

		test.done();
	},

	'should increase tests amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.incTests();
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="1"/>',
			'The initial tests amount is not correct'
		);

		suite.incTests(2);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="3"/>',
			'The increased tests amount is not correct'
		);

		test.done();
	},

	'should set execution time in seconds of testsuite': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setTime(5);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" time="5"/>',
			'The given time is not correct'
		);

		suite.setTime(200);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" time="200"/>',
			'The given time was not overwritten'
		);

		test.done();
	},

	'should set name': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setName('foo');
		test.equal(
			suite.toString(),
			'<testsuite name="foo" tests="0"/>',
			'The given name is not correct'
		);

		test.done();
	},

	'should set timestamp': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename'),
			date = new Date()
		;

		date.setUTCFullYear(2014);
		date.setUTCMonth(0);
		date.setUTCDate(21);
		date.setUTCHours(16);
		date.setUTCMinutes(17);
		date.setUTCSeconds(18);
		date.setUTCMilliseconds(19);

		suite.setTimestamp(date);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" timestamp="2014-01-21T16:17:18"/>',
			'The timestamp format is not the expeected one'
		);

		test.done();
	},

	'should fail when set timestamp without a valid date instance': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		test.throws(
			function() {suite.setTimestamp('2014-01-21T16:17:18');},
			'Timestamp must be an instance of Date',
			'The function didn\'t throw an error when passing a string'
		);

		test.throws(
			function() {suite.setTimestamp(20140121);},
			'Timestamp must be an instance of Date',
			'The function didn\'t throw an error when passing a number'
		);

		test.done();
	},

	'should set hostname': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setHostname('foobar.baz');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" hostname="foobar.baz"/>',
			'The given hostname is not correct'
		);

		suite.setHostname('foo.baz.bar');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" hostname="foo.baz.bar"/>',
			'The given hostname was not overwritten'
		);

		test.done();
	},

	'should set package': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setPackage('foo.bar.baz');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" package="foo.bar.baz"/>',
			'The given package is not correct'
		);

		suite.setPackage('baz.bar.foo');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" package="baz.bar.foo"/>',
			'The given package was not overwritten'
		);

		test.done();
	},

	'should set skipped tag': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSkipped(true);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><skipped/></testsuite>',
			'The testsuite has no correct skipped tag'
		);

		test.done();
	},

	'should not set skipped tag twice': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSkipped(true);
		suite.setSkipped(true);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><skipped/></testsuite>',
			'The testsuite has multiple skipped tags'
		);

		test.done();
	},

	'should remove skipped tag when set to false': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSkipped(true);
		suite.setSkipped(false);
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"/>',
			'The testsuite still contains a skipped tag'
		);

		test.done();
	},

	'should toggle the attribute of the given ID': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.showId();
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0" id="0"/>',
			'The ID was not displayed'
		);

		suite.hideId();
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"/>',
			'The ID was not removed correctly'
		);

		test.done();
	},

	'should add properties': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.addProperty('foo', 123);
		suite.addProperty('bar', 'baz');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><properties><property name="foo" value="123"/><property name="bar" value="baz"/></properties></testsuite>',
			'The properties are missing'
		);

		test.done();
	},

	'should remove properties completely': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.addProperty('foo', 123);
		suite.addProperty('bar', 'baz');
		suite.removeProperty('foo');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><properties><property name="bar" value="baz"/></properties></testsuite>',
			'The properties are not removed correctly'
		);

		suite.removeProperty('bar');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"/>',
			'The properties are not removed completely'
		);

		test.done();
	},

	'should update properties': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.addProperty('foo', 123);
		suite.updateProperty('foo', 'bar');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><properties><property name="foo" value="bar"/></properties></testsuite>',
			'The properties are not removed correctly'
		);

		test.done();
	},

	'should set system-out': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSystemOut('some system out');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><system-out>some system out</system-out></testsuite>',
			'The system out is not displayed correctly'
		);

		test.done();
	},

	'should update system-out': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSystemOut('some system out');
		suite.setSystemOut('some another system out');

		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><system-out>some another system out</system-out></testsuite>',
			'The system out is not displayed correctly'
		);

		test.done();
	},

	'should set system-err': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSystemError('some system error');
		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><system-err>some system error</system-err></testsuite>',
			'The system error is not displayed correctly'
		);

		test.done();
	},

	'should update system-err': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			suite = suites.addTestsuite('suitename')
		;

		suite.setSystemError('some system error');
		suite.setSystemError('some another system error');

		test.equal(
			suite.toString(),
			'<testsuite name="suitename" tests="0"><system-err>some another system error</system-err></testsuite>',
			'The system error is not displayed correctly'
		);

		test.done();
	}
};
