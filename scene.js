/*

Metamorphosis
http://www.atanaslaskov.com/metamorphosis/

File:        scene.js
Description: Animated scene
Author:      Copyright (c) 2014, Atanas Laskov
License:     BSD license, see LICENSE for more details.

*/

// Construct scene
//
function laAnimatedScene() {
	var self = this;

	self.renderer = new THREE.WebGLRenderer( {antialias: true} );
	self.renderer.setSize( window.innerWidth, window.innerHeight );
	self.renderer.setClearColor( 0x333333, 1 );
	document.body.appendChild( self.renderer.domElement );
	
	self.init3d();
	self.load();
};

// Initialize 3D view
//
laAnimatedScene.prototype.init3d = function() {
	var self = this;
	
	self.scene   = new THREE.Scene();
	self.camera  = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	self.camera.position.y = -1;
	self.camera.position.z = +12;
	
	/*var lightAmbient = new THREE.AmbientLight( 0xaaaaaa );
	self.scene.add( lightAmbient );
	
	var lightPoint = new THREE.PointLight( 0xff4400, 5, 30 );
	lightPoint.position.set( 0, 10, 0 );
	self.scene.add( lightPoint );*/
};

// Load geometry
//
laAnimatedScene.prototype.load = function() {
	var self = this;
	
	self.creature = new laMorphCreature( function( morph ) {
		self.scene.add( morph );
	});
	
	/*var textGeo = new THREE.TextGeometry( "I'm a flying box.", {size: 0.2, height:0.01, font: "droid sans"} );			
	var textMaterial = new THREE.MeshNormalMaterial();
	var textMesh = new THREE.Mesh( textGeo, textMaterial );
	
	textMesh.position.x = -1;	
	textMesh.position.y = +2;	
	self.scene.add( textMesh );*/
};

// Render scene
//
laAnimatedScene.prototype.render = function() {
	var self = this;
	self.renderer.render( self.scene, self.camera );
};

// Animate scene
//
laAnimatedScene.prototype.animate = function( dt ) {
	var self = this;
	self.creature.animate( dt );
};

// Key down
//
laAnimatedScene.prototype.keydown = function( code ) {
};

// Resize viewport
//
laAnimatedScene.prototype.resize = function() {
	var self = this;
	
	self.renderer.setSize( window.innerWidth, window.innerHeight );
	
	self.camera.aspect = window.innerWidth / window.innerHeight;
	self.camera.updateProjectionMatrix();
};
