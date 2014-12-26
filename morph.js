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

	var material = new THREE.MeshNormalMaterial( { morphTargets: true, shading: THREE.SmoothShading } );
	var loader   = new THREE.JSONLoader();

	self.morph           = null;
	self.morphRatio      = 1;
	self.morphDirection  = 1;
	self.morphDelayMax   = 2.0;
	self.morphDelay      = self.morphDelayMax;

	self.angleSwing = 0;

	loader.load( "resources/elephant_fly.json", function ( geo ) {
		console.log("Morph geometry loaded.");

		self.morph = new THREE.MorphAnimMesh( geo, material );

		onloaded( self.morph );
	});
};

// Animate the creature
//
laMorphCreature.prototype.animate = function( dt ) {
	var self = this;

	// Wait for geometry to load
	if( !self.morph ) return;

	if( self.morphDelay == 0 ) {

		// Update morph ratio
		self.morphRatio += 0.8 * self.morphDirection * dt;

		// Normalize morph ratio if out of range
		if( (self.morphRatio <= 0) || (self.morphRatio >= 1) ) {

			self.morphDelay     = self.morphDelayMax;
			self.morphDirection = -1 * self.morphDirection;

			self.clampMorphRatio();
		}

		// Update geometry influencers
		self.morph.morphTargetInfluences[0] = self.morphRatio;
		self.morph.morphTargetInfluences[1] = 1 - self.morphRatio;
	}
	else {
		// Wait between morphs
		self.morphDelay -= dt;

		if( self.morphDelay <= 0 ) {
			self.morphDelay = 0;
		}
	}

	self.morph.updateAnimation( dt );

	// Add swing and rotation
	self.angleSwing += ( Math.PI*0.5 ) * dt;
	self.morph.position.y = Math.cos( self.angleSwing ) * 0.5;
	self.morph.rotation.y -= 0.1 * dt;
};

// Constrain morph ratio to the range [0;1]
//
laMorphCreature.prototype.clampMorphRatio = function() {
	var self = this;
	self.morphRatio = Math.min( Math.max(self.morphRatio, 0), 1 );
}
