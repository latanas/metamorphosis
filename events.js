/*
Metamorphosis
http://www.atanaslaskov.com/metamorphosis/

File:        event.js
Description: DOM events dispatcher
Author:      Copyright (c) 2014, Atanas Laskov
License:     BSD license, see LICENSE for more details.
*/

document.addEventListener("DOMContentLoaded", function() {
	var scene = new laAnimatedScene();
	var clock  = new THREE.Clock(true);

	// Render and animate
	function doRender() {
		requestAnimationFrame( doRender );

		scene.render();
		scene.animate( clock.getDelta() );
	};
	doRender();

	// Resize the viewport
	window.addEventListener( 'resize', function() {
		scene.resize();
	});

	// Keyboard
	document.addEventListener( 'keydown', function(event) {
		scene.keydown( event.keyCode );
	});
});
