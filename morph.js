/*

Metamorphosis
http://www.atanaslaskov.com/metamorphosis/

File:        morph.js
Description: Morphing creature
Author:      Copyright (c) 2014, Atanas Laskov
License:     BSD license, see LICENSE for more details.

*/

// Construct the creature
//
function laMorphCreature( onloaded ) {
	var self = this;
	
	var material = new THREE.MeshNormalMaterial( { morphTargets: true } );
	var loader   = new THREE.JSONLoader();
	
	self.morph      = null;
	self.angleSwing = 0;
	
	loader.load( "resources/winged-box.js", function ( geo ) {
		console.log("Morph geometry loaded.");
		self.morph = new THREE.MorphAnimMesh( geo, material );
		
		self.morph.duration = 1;
		self.morph.time     = 0.5;
		
		onloaded( self.morph );
	});
};

// Animate the creature
//
laMorphCreature.prototype.animate = function( dt ) {
	var self = this;
	
	if( !self.morph ) return;
	
	self.angleSwing += ( Math.PI*2 ) * dt;
	
	self.morph.updateAnimation( dt );
	self.morph.position.y = Math.cos( self.angleSwing ) * 0.5;
	self.morph.rotation.y += 0.2 * dt;
};