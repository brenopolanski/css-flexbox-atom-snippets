# JUnitWriter

A junit reporter for node.

[![Travis Status](https://travis-ci.org/schorfES/node-junitwriter.png?branch=master)](https://travis-ci.org/schorfES/node-junitwriter)

## Installation

This package is available on [npm](https://www.npmjs.com/package/junitwriter/)
as: `junitwriter`

``` sh
	npm install junitwriter
```

## Methods

<strong style="color:red">The documentation is work in progress</strong>

### Writer

#### new Writer()

Creates an instance of the junit reporter. When creating an instance a
testsuites rootnode is created internally which can be accessed through the
function `getTestsuites()`.

#### getTestsuites()

Retuns the testsuites root node.

#### addTestsuite(name)

Adds and retuns a testsuite node inside the testsuites root node.

#### save(destination, callback)

This function saves the content of the report to a file at the given
`destination`.

### Testsuites

#### addTestsuite(name)

Adds and retuns a testsuite node inside the testsuites root node.

#### incDisabled(amount)

#### incErrors(amount)

#### incFailures(amount)

#### incTests(amount)

#### setTime(seconds)

#### setName(name)

#### setSystemOut(out)

#### setSystemError(err)

#### showIds()

#### hideIds()

### Testsuite

Testsuite can appear multiple times as a child element of testsuites.

#### addTestcase(name, classname)

#### incDisabled(amount)

#### incErrors(amount)

#### incFailures(amount)

#### incTests(amount)

#### setTime(seconds)

#### setTimestamp(timestamp)

#### setName(name)

#### setSystemOut(out)

#### setSystemError(err)

#### setHostname(hostname)

#### setPackage(package)

#### setSkipped(skipped)

#### isSkipped()

#### showId()

#### hideId()

#### addProperty(name, value)

#### removeProperty(name)

#### updateProperty(name, value)

#### addError(message, type)

#### addFailure(message, type)

### Testcase

#### setName(name)

#### setClassname(classname)

#### setAssertions(assertions)

#### setTime(seconds)

## License

[LICENSE (MIT)](https://github.com/schorfES/node-junitwriter/blob/master/LICENSE)
