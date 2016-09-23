var roleHarvester = {
	run: function (creep) {
		if (creep.memory.working && creep.carry.energy === 0) {
			creep.memory.working = false;
			creep.say('harvesting');
		} else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
			creep.memory.working = true;
			creep.say('returning');
		}

		if (creep.memory.working) {
			var closestStructure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (structure) => (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity
			});
			if (closestStructure != undefined && creep.transfer(closestStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(closestStructure);
			}
		}
		else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	}
};

module.exports = roleHarvester;