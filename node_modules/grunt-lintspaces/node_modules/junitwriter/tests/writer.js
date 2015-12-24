var
	fs = require('fs'),
	Writer = require(process.cwd() + '/lib/Writer')
;

exports['The Writer'] = {
	'should create an instance': function(test) {
		var writer = new Writer();
		test.done();
	},

	'should initially retun an "empty" testsuites collection': function(test) {
		var writer = new Writer();
		test.equal(
			writer.toString(),
			'<?xml version="1.0" encoding="UTF-8"?>\n' +
			'<testsuites/>'
		);
		test.done();
	},

	'should add a testsuite': function(test) {
		var writer = new Writer();
		writer.addTestsuite('suitename');
		test.equal(
			writer.toString(),
			'<?xml version="1.0" encoding="UTF-8"?>\n' +
			'<testsuites><testsuite name="suitename" tests="0"/></testsuites>'
		);
		test.done();
	},

	'should save to file': function(test) {
		var
			path = __dirname + '/.temp-out.xml',
			writer = new Writer()
		;

		test.expect(5);

		writer.save(path, function(error, instance) {
			test.equal(error, null, 'There is an error while writing the file');
			test.equal(instance, writer, 'The returned instance is not the writer instance');


			// Test if exists
			fs.exists(path, function(exists) {
				test.ok(exists, 'The file does not exsist');

				// Test if its a file
				fs.stat(path, function(error, stats) {
					if (error) {
						throw error;
					}

					test.ok(stats.isFile(), 'The path is not a file');

					// Test content of file
					fs.readFile(path, function(error, data) {
						if (error) {
							throw error;
						}

						test.equal(
							data,
							'<?xml version="1.0" encoding="UTF-8"?>\n' +
							'<testsuites/>',
							'The output is not the expected one'
						);

						// Delete file to be done
						fs.unlink(path, function(error) {
							if (error) {
								throw error;
							}

							test.done();
						});
					});
				});
			});
		});
	},

	'should save to file in directory that doesn\'t exisits': function(test) {
		var
			dir = __dirname + '/test-dir/',
			path = dir + 'temp-out.xml',
			writer = new Writer()
		;

		test.expect(5);

		writer.save(path, function(error, instance) {
			test.equal(error, null, 'There is an error while writing the file');
			test.equal(instance, writer, 'The returned instance is not the writer instance');


			// Test if exists
			fs.exists(path, function(exists) {
				test.ok(exists, 'The file does not exsist');

				// Test if its a file
				fs.stat(path, function(error, stats) {
					if (error) {
						throw error;
					}

					test.ok(stats.isFile(), 'The path is not a file');

					// Test content of file
					fs.readFile(path, function(error, data) {
						if (error) {
							throw error;
						}

						test.equal(
							data,
							'<?xml version="1.0" encoding="UTF-8"?>\n' +
							'<testsuites/>',
							'The output is not the expected one'
						);

						// Delete file to be done
						fs.unlink(path, function(error) {
							if (error) {
								throw error;
							}

							// Delete directory to be done
							fs.rmdir(dir, function(error) {
								if (error) {
									throw error;
								}

								test.done();
							});

						});
					});
				});
			});
		});
	},

	'should save to file that already exists': function(test) {
		var
			path = __dirname + '/.temp-out.xml',
			writer = new Writer()
		;

		test.expect(2);

		// Create an other version of the output file
		fs.writeFile(path, 'some dummy text', function(error) {
			if (error) {
				throw error;
			}

			// Execute the save() function
			writer.save(path, function(error) {
				test.equal(error, null, 'There is an error while writing the file');

				// Test content of file
				fs.readFile(path, function(error, data) {
					if (error) {
						throw error;
					}

					test.equal(
						data,
						'<?xml version="1.0" encoding="UTF-8"?>\n' +
						'<testsuites/>',
						'The output is not the expected one'
					);

					// Delete file to be done
					fs.unlink(path, function(error) {
						if (error) {
							throw error;
						}

						test.done();
					});
				});
			});
		});
	}
};
