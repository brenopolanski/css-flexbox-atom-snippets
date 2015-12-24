var
	Writer = require(process.cwd() + '/lib/Writer'),
	Testsuite = require(process.cwd() + '/lib/Testsuite')
;

exports['The Testsuites'] = {
	'should increase disabled amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.incDisabled();
		test.equal(
			suites.toString(),
			'<testsuites disabled="1"/>',
			'The initial disabled amount is not correct'
		);

		suites.incDisabled(2);
		test.equal(
			suites.toString(),
			'<testsuites disabled="3"/>',
			'The increased disabled amount is not correct'
		);

		test.done();
	},

	'should increase errors amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.incErrors();
		test.equal(
			suites.toString(),
			'<testsuites errors="1"/>',
			'The initial errors amount is not correct'
		);

		suites.incErrors(2);
		test.equal(
			suites.toString(),
			'<testsuites errors="3"/>',
			'The increased errors amount is not correct'
		);

		test.done();
	},

	'should increase failures amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.incFailures();
		test.equal(
			suites.toString(),
			'<testsuites failures="1"/>',
			'The initial failures amount is not correct'
		);

		suites.incFailures(2);
		test.equal(
			suites.toString(),
			'<testsuites failures="3"/>',
			'The increased failures amount is not correct'
		);

		test.done();
	},

	'should increase tests amount': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.incTests();
		test.equal(
			suites.toString(),
			'<testsuites tests="1"/>',
			'The initial tests amount is not correct'
		);

		suites.incTests(2);
		test.equal(
			suites.toString(),
			'<testsuites tests="3"/>',
			'The increased tests amount is not correct'
		);

		test.done();
	},

	'should set execution time in seconds of testsuites': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.setTime(5);
		test.equal(
			suites.toString(),
			'<testsuites time="5"/>',
			'The given time is not correct'
		);

		suites.setTime(200);
		test.equal(
			suites.toString(),
			'<testsuites time="200"/>',
			'The given time was not overwritten'
		);

		test.done();
	},

	'should set name': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.setName('foo');
		test.equal(
			suites.toString(),
			'<testsuites name="foo"/>',
			'The given name is not correct'
		);

		suites.setName('foobarbaz');
		test.equal(
			suites.toString(),
			'<testsuites name="foobarbaz"/>',
			'The given name was not overwritten'
		);

		test.done();
	},

	'should add new testsuites': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites(),
			testsuiteA = suites.addTestsuite('suitenameA'),
			testsuiteB = suites.addTestsuite('suitenameB')
		;

		test.ok(testsuiteA instanceof Testsuite);
		test.ok(testsuiteB instanceof Testsuite);
		test.notEqual(testsuiteA, testsuiteB);
		test.equal(
			suites.toString(),
			'<testsuites><testsuite name="suitenameA" tests="0"/><testsuite name="suitenameB" tests="0"/></testsuites>',
			'The testsuites are not correct added'
		);

		test.done();
	},

	'should show ids in all created testsuites': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.addTestsuite('suitenameA');
		suites.addTestsuite('suitenameB');
		suites.showIds();

		test.equal(
			suites.toString(),
			'<testsuites><testsuite name="suitenameA" tests="0" id="0"/><testsuite name="suitenameB" tests="0" id="1"/></testsuites>',
			'The testsuite nodes didn\'t contain the correct ID'
		);

		suites.addTestsuite('suitenameC');

		test.equal(
			suites.toString(),
			'<testsuites><testsuite name="suitenameA" tests="0" id="0"/><testsuite name="suitenameB" tests="0" id="1"/><testsuite name="suitenameC" tests="0" id="2"/></testsuites>',
			'The the later added testsuite didn\'t contain an ID'
		);

		test.done();
	},

	'should hide ids in all created testsuites': function(test) {
		var
			writer = new Writer(),
			suites = writer.getTestsuites()
		;

		suites.showIds();
		suites.addTestsuite('suitenameA');
		suites.addTestsuite('suitenameB');

		test.equal(
			suites.toString(),
			'<testsuites><testsuite name="suitenameA" tests="0" id="0"/><testsuite name="suitenameB" tests="0" id="1"/></testsuites>',
			'The testsuite nodes didn\'t contain the correct ID'
		);

		suites.hideIds();

		test.equal(
			suites.toString(),
			'<testsuites><testsuite name="suitenameA" tests="0"/><testsuite name="suitenameB" tests="0"/></testsuites>',
			'The testsuite nodes still contain an ID attribute'
		);

		suites.addTestsuite('suitenameC');

		test.equal(
			suites.toString(),
			'<testsuites><testsuite name="suitenameA" tests="0"/><testsuite name="suitenameB" tests="0"/><testsuite name="suitenameC" tests="0"/></testsuites>',
			'The testsuite nodes are not free from ID attributes'
		);

		test.done();
	}
};
