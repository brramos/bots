var creepFactory = require('creep.factory');
var roleManager = require('role.manager');

module.exports.loop = function () {
	var tower = Game.getObjectById('57e2836befd0648323e9dd95');
	if(tower) {
		var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
		});
		if(closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}

		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			tower.attack(closestHostile);
		}
	}

	creepFactory.create();

	roleManager.run();

	// Game.spawns.Alpha.room.createConstructionSite( 34, 36, STRUCTURE_ROAD );
	// Game.spawns['Alpha'].room.createConstructionSite( 23, 30, STRUCTURE_ROAD );
	// Game.spawns['Alpha'].room.createConstructionSite( 26, 30, STRUCTURE_ROAD );
	// Game.spawns['Alpha'].room.createConstructionSite( 25, 30, STRUCTURE_ROAD );
	//Game.spawns.Alpha.room.createConstructionSite( 31, 32, STRUCTURE_EXTENSION );

	//Game.spawns['Alpha'].room.createFlag(41, 24, '2', COLOR_WHITE, COLOR_YELLOW);
	//Game.flags['1'].setPosition(19,29);
	// Game.flags['2'].setPosition(28,35);

	// Game.creeps['Adalyn'].memory.role = 'upgrader';
	//Game.creeps['Jordan'].memory.role = 'builder';
	//Game.creeps['Charlie'].memory.role = 'harvester';
	// Game.creeps['Isaac'].memory.role = 'repairer';


};