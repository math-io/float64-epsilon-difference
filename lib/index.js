'use strict';

// MODULES //

var rdiff = require( 'math-relative-difference' );
var PINF = require( 'const-pinf-float64' );
var MAX_FLOAT64 = require( 'const-max-float64' );
var EPS = require( 'const-eps-float64' );


// VARIABLES //

var MAX_VALUE = MAX_FLOAT64 * EPS;


// RELATIVE DIFFERENCE //

/**
* FUNCTION: diff( x, y[, scale] )
*	Computes the relative difference in units of double-precision floating-point epsilon.
*
* @param {Number} x - first number
* @param {Number} y - second number
* @param {String|Function} [scale='max-abs'] - scale function
* @returns {Number} relative difference
*/
function diff( x, y, scale ) {
	var d = rdiff( x, y, scale || 'max-abs' );

	// If `d` is `NaN` or `+infinity`, nothing we can do...
	if ( d !== d || d === PINF ) {
		return d;
	}
	// If `d >= MAX_VALUE`, we will overflow, as `EPS <<< 1`. To prevent overflow, we cap out at the maximum double-precision floating-point number...
	if ( d >= MAX_VALUE ) {
		return MAX_FLOAT64;
	}
	// Return the answer to the question: how many EPS increments is the relative difference?
	return d / EPS;
} // end FUNCTION diff()


// EXPORTS //

module.exports = diff;
