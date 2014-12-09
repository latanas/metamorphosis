/*
File:        scene.js
Description: Animated scene
Author:      Copyright (c) 2014, Atanas Laskov
License:     BSD license, see LICENSE for more details.
*/
function laAnimatedScene() {
	var self = this;

	self.scene = new THREE.Scene();
	self.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	self.renderer = new THREE.WebGLRenderer( {antialias: true} );

	self.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( self.renderer.domElement );

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

	self.mesh = new THREE.Mesh( geometry, material );
	
	self.scene.add( self.mesh );
	self.camera.position.z = 5;
};

laAnimatedScene.prototype = {
	render: function() {
		var self = this;
		self.renderer.render( self.scene, self.camera );
	},

	animate: function(dt) {
		var self = this;
		self.mesh.rotation.y += 0.3 * dt;
	},

	keydown: function(code) {
	},

	resize: function() {
		var self = this;
		self.camera.aspect = window.innerWidth / window.innerHeight;
		self.camera.updateProjectionMatrix();
		self.renderer.setSize( window.innerWidth, window.innerHeight );
	},
};
