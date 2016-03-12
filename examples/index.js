'use strict';

var diff = require( './../lib' );

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
