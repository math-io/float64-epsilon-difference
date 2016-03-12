'use strict';

// MODULES //

var tape = require( 'tape' );
var PINF = require( 'const-pinf-float64' );
var NINF = require( 'const-ninf-float64' );
var EPS = require( 'const-eps-float64' );
var MAX_FlOAT64 = require( 'const-max-float64' );
var diff = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof diff, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided an unrecognized/unsupported `scale` function name', function test( t ) {
	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		diff( -2, 5, 'abcdefg' );
	}
});

tape( 'if both `x` and `y` equal `+infinity`, the function returns `NaN`', function test( t ) {
	var d = diff( PINF, PINF );
	t.ok( d !== d, 'returns NaN' );
	t.end();
});

tape( 'if both `x` and `y` equal `-infinity`, the function returns `NaN`', function test( t ) {
	var d = diff( NINF, NINF );
	t.ok( d !== d, 'returns NaN' );
	t.end();
});

tape( 'if `x` or `y` equals `+infinity` and the other value equals any other number (beside +infinity), the function returns `+infinity`', function test( t ) {
	var values;
	var d;
	var i;

	values = [
		NINF,
		5,
		10,
		3.14,
		-1e308
	];

	for ( i = 0; i < values.length; i++ ) {
		d = diff( PINF, values[i] );
		t.equal( d, PINF, 'returns +infinity' );

		d = diff( values[i], PINF );
		t.equal( d, PINF, 'returns +infinity' );
	}
	t.end();
});

tape( 'if `x` or `y` equals `-infinity` and the other value equals any other number (beside -infinity), the function returns `+infinity`', function test( t ) {
	var values;
	var d;
	var i;

	values = [
		PINF,
		5,
		10,
		3.14,
		-1e308
	];

	for ( i = 0; i < values.length; i++ ) {
		d = diff( NINF, values[i] );
		t.equal( d, PINF, 'returns +infinity' );

		d = diff( values[i], NINF );
		t.equal( d, PINF, 'returns +infinity' );
	}
	t.end();
});

tape( 'if `x` and/or `y` is `NaN`, the function returns `NaN`', function test( t ) {
	var d;

	d = diff( NaN, 5 );
	t.ok( d !== d, 'returns NaN' );

	d = diff( 3, NaN );
	t.ok( d !== d, 'returns NaN' );

	t.end();
});

tape( 'if `x = y` and `x` and `y` are both finite, the function always returns `0`', function test( t ) {
	var values;
	var v;
	var d;
	var i;

	values = [
		5,
		-1,
		3.14,
		-3.14,
		0,
		-0,
		1e308,
		-1e-324
	];

	for ( i = 0; i < values.length; i++ ) {
		v = values[ i ];
		d = diff( v, v );
		t.equal( d, 0, 'returns 0' );
	}
	t.end();
});

tape( 'if `x` and `y` both equal `+-0`, the function returns `0`', function test( t ) {
	var d;

	d = diff( -0, 0 );
	t.equal( 1/d, PINF, 'returns +0' );

	d = diff( -0, -0 );
	t.equal( 1/d, PINF, 'returns +0' );

	d = diff( 0, 0 );
	t.equal( 1/d, PINF, 'returns +0' );

	d = diff( 0, -0 );
	t.equal( 1/d, PINF, 'returns +0' );

	t.end();
});

tape( 'if a scale function returns `0`, the function returns `NaN`', function test( t ) {
	var d;

	d = diff( -1, 1, 'mean' );
	t.ok( d !== d, 'returns NaN' );

	d = diff( -1, 0, 'max' );
	t.ok( d !== d, 'returns NaN' );

	d = diff( 0, 1, 'min' );
	t.ok( d !== d, 'returns NaN' );

	d = diff( 0, -1, 'min-abs' );
	t.ok( d !== d, 'returns NaN' );

	d = diff( 0, 5, 'x' );
	t.ok( d !== d, 'returns NaN' );

	d = diff( 5, 0, 'y' );
	t.ok( d !== d, 'returns NaN' );

	d = diff( 2, 5, scale );
	t.ok( d !== d, 'returns NaN' );

	t.end();

	function scale() {
		return 0;
	}
});

tape( 'the function computes the relative difference (default)', function test( t ) {
	var expected;
	var d;

	d = diff( -2, 5 );
	expected = (7/5) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (max-abs)', function test( t ) {
	var expected;
	var d;

	d = diff( 5, -2, 'max-abs' );
	expected = ((5+2)/5) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (max)', function test( t ) {
	var expected;
	var d;

	d = diff( 1, 10, 'max' );
	expected = (9/10) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (min-abs)', function test( t ) {
	var expected;
	var d;

	d = diff( -1, 10, 'min-abs' );
	expected = 11 / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (min)', function test( t ) {
	var expected;
	var d;

	d = diff( 1, 10, 'min' );
	expected = 9 / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (x)', function test( t ) {
	var expected;
	var d;

	d = diff( 10, -1, 'x' );
	expected = (11/10) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (y)', function test( t ) {
	var expected;
	var d;

	d = diff( 10, -1, 'y' );
	expected = 11 / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (mean)', function test( t ) {
	var expected;
	var d;

	d = diff( -1, 10, 'mean' );
	expected = (11/4.5) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function computes the relative difference (mean-abs)', function test( t ) {
	var expected;
	var d;

	d = diff( 10, -1, 'mean-abs' );
	expected = (11/5.5) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();
});

tape( 'the function supports custom scale functions', function test( t ) {
	var expected;
	var d;

	d = diff( 12.15, 12.149999999999999, scale );
	expected = ((12.15-12.149999999999999)/12.15) / EPS;

	t.equal( d, expected, 'returns '+expected );
	t.end();

	function scale( x, y ) {
		return ( x < y ) ? y : x;
	}
});

tape( 'if computing the relative difference will result in overflow, the function returns the maximum double-precision floating-point number', function test( t ) {
	var d = diff( 1e304, 1, 'min' );
	t.equal( 1e304/EPS, PINF, 'conversion will result in overflow' );
	t.equal( d, MAX_FlOAT64, 'returns '+MAX_FlOAT64 );
	t.end();
});
