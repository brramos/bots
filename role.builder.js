let roleHarvester = require('role.harvester');

function run(creep) {
	if (creep.memory.working && creep.carry.energy === 0) {
		creep.memory.working = false;
		creep.say('harvesting');
	} else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
		creep.memory.working = true;
		creep.say('building');
	}

	if (creep.memory.working) {
		let construction_site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
		if (construction_site != undefined) {
			if (creep.build(construction_site) === ERR_NOT_IN_RANGE) {
				creep.moveTo(construction_site);
			}
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