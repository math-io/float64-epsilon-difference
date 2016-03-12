'use strict';

var EPS = require( 'const-eps-float64' );
var diff = require( './../lib' );

var sign;
var x;
var y;
var d;
var i;

for ( i = 0; i < 100; i++ ) {
	x = Math.random();
	sign = ( Math.random() > 0.5 ) ? 1 : -1;
	y = x + sign*EPS*i;
	d = diff( x, y );
	console.log( 'x = %d. y = %d. d = %dε.', x, y, d );
}
