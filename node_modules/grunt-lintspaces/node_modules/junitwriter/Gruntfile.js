var
	testableFiles = [
		'tests/**/*.js',
		'!tests/**/fixures/*.js',
	],
	validateableFiles = [
		'Gruntfile.js',
		'lib/**/*.js',
		'tests/**/*.js',
		'!tests/**/fixures/*.js',
		'example/**/*.js'
	]
;

module.exports = function(grunt) {

		grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

	// Node Unit:
	// -------------------------------------------------------------------------
	grunt.config('nodeunit', {
		all: testableFiles
	});
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// JS Hint:
	// -------------------------------------------------------------------------
	grunt.config('jshint', {
		all: validateableFiles,
		options: {jshintrc: true}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// JSCS:
	// -------------------------------------------------------------------------
	grunt.config('jscs', {
		all: {
			src: validateableFiles,
			options: {config: '.jscs.json'}
		}
	});

	grunt.loadNpmTasks('grunt-jscs');

	// Lintspaces
	// -------------------------------------------------------------------------
	grunt.config('lintspaces', {
		all: {
			src: validateableFiles,
			options: {
				newlineMaximum: 2,
				ignores: ['js-comments'],
				editorconfig: '.editorconfig'
			}
		}
	});

	grunt.loadNpmTasks('grunt-lintspaces');

	// Setup default tasks:
	// -------------------------------------------------------------------------
	grunt.registerTask('validate', [
		'jshint',
		'jscs'
	]);

	grunt.registerTask('test', [
		'nodeunit'
	]);

	grunt.registerTask('default', [
		'validate',
		'test'
	]);

};
