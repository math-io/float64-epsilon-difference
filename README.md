Relative Difference
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [relative difference][relative-difference] of two real numbers in units of [double-precision floating-point epsilon][float64-epsilon].


## Installation

``` bash
$ npm install math-float64-epsilon-difference
```


## Usage

``` javascript
var diff = require( 'math-float64-epsilon-difference' );
```

#### diff( x, y[, scale] )

Computes the [relative difference][relative-difference] of two real numbers in units of [double-precision floating-point epsilon][float64-epsilon].

``` javascript
var d = diff( 12.15, 12.149999999999999 );
// returns ~0.658ε
```

The following [`scale`][relative-difference] functions are supported:

*	__max-abs__: maximum [absolute value][absolute-value] of `x` and `y` (*default*).
*	__max__: maximum value of `x` and `y`.
*	__min-abs__: minimum [absolute value][absolute-value] of `x` and `y`.
*	__min__: minimum value of `x` and `y`.
*	__mean-abs__: arithmetic mean of the [absolute values][absolute-value] of `x` and `y`.
*	__mean__: arithmetic mean of `x` and `y`.
*	__x__: `x` (*noncommutative*).
*	__y__: `y` (*noncommutative*).

By default, the `function` scales the [absolute difference][absolute-difference] by dividing the [absolute difference][absolute-difference] by the maximum [absolute value][absolute-value] of `x` and `y`. To scale by a different `function`, specify a scale function name. 

``` javascript
var d = diff( 2.4341309458983933, 2.4341309458633909, 'mean-abs' );
// returns ~64761.5ε => ~1.438e-11
```

To use a custom scale `function`, provide a `function` which accepts two numeric arguments `x` and `y`.

``` javascript
function scale( x, y ) {
	// Return the minimum value:
	return ( x > y ) ? y : x;
}

var d = diff( 1.0000000000000002, 1.0000000000000100, scale );
// returns ~44ε
```


## Notes

*	If computing the [relative difference][relative-difference] in units of [epsilon][float64-epsilon] will result in overflow, the function returns the [maximum double-precision floating-point number][max-float64].

	``` javascript
	var d = diff( 1e304, 1, 'min' );
	// returns ~1.798e308ε => 1e304/EPS overflows
	```
*	If the [absolute difference][absolute-difference] of `x` and `y` is `0`, the [relative difference][relative-difference] is __always__ `0`.

	``` javascript
	var d = diff( 0, 0 );
	// returns 0ε

	d = diff( 3.14, 3.14 );
	// returns 0ε
	```
*	If `|x| = |y| = infinity`, the function returns `NaN`.

	``` javascript
	var PINF = Number.POSITIVE_INFINITY;
	var NINF = Number.NEGATIVE_INFINITY;

	var d = diff( PINF, PINF );
	// returns NaN

	d = diff( NINF, NINF );
	// returns NaN
	``` 
* 	If `|x| = |-y| = infinity`, the [relative difference][relative-difference] is `+infinity`.

	``` javascript
	var PINF = Number.POSITIVE_INFINITY;
	var NINF = Number.NEGATIVE_INFINITY;

	var d = diff( PINF, NINF );
	// returns +infinity

	d = diff( NINF, PINF );
	// returns +infinity
	```
*	If a `scale` function returns `0`, the function returns `NaN`.

	``` javascript
	var d = diff( -1, 1, 'mean' );
	// returns NaN => |2/0|
	```


## Examples

``` javascript
var diff = require( 'math-float64-epsilon-difference' );

var x;
var y;
var d;
var i;

for ( i = 0; i < 100; i++ ) {
	x = Math.random()*1e4 - 5e3;
	y = Math.random()*1e4 - 5e3;
	d = diff( x, y );
	console.log( 'x = %d. y = %d. d = %dε.', x, y, d );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float64-epsilon-difference.svg
[npm-url]: https://npmjs.org/package/math-float64-epsilon-difference

[build-image]: http://img.shields.io/travis/math-io/float64-epsilon-difference/master.svg
[build-url]: https://travis-ci.org/math-io/float64-epsilon-difference

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float64-epsilon-difference/master.svg
[coverage-url]: https://codecov.io/github/math-io/float64-epsilon-difference?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float64-epsilon-difference.svg
[dependencies-url]: https://david-dm.org/math-io/float64-epsilon-difference

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float64-epsilon-difference.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float64-epsilon-difference

[github-issues-image]: http://img.shields.io/github/issues/math-io/float64-epsilon-difference.svg
[github-issues-url]: https://github.com/math-io/float64-epsilon-difference/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/

[float64-epsilon]: https://github.com/const-io/eps-float64
[max-float64]: https://github.com/const-io/max-float64
[absolute-value]: https://github.com/math-io/abs
[absolute-difference]: https://github.com/math-io/absolute-difference
[relative-difference]: https://github.com/math-io/relative-difference
