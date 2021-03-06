let roleHarvester = require('role.harvester');

function run(creep) {
	if (creep.memory.repairing && creep.carry.energy == 0) {
		creep.memory.repairing = false;
		creep.say('harvesting');
	}
	if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
		creep.memory.repairing = true;
		creep.say('repairing');
	}

	if (creep.memory.repairing) {
		let tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: (structure) => (structure.structureType === STRUCTURE_TOWER)
		});
		if (tower != undefined && creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
			creep.moveTo(tower);
		} else {
			let closest_source = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(closest_source) === ERR_NOT_IN_RANGE) {
				creep.moveTo(closest_source);
			}
			let closestStructure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (structure) => (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity
			});
			if (closestStructure != undefined && creep.transfer(closestStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(closestStructure);
			}
		}
	}
	else {
		roleHarvester.run(creep);
	}
}

module.exports = {
	run: run
};