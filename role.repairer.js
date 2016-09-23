var roleRepairer = {

	run: function (creep) {
		if (creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
			creep.say('harvesting');
		}
		if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
			creep.say('repairing');
		}

		if (creep.memory.repairing) {
			var closestDamagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (structure) => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL
			});
			if (closestDamagedStructure != undefined && creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
				creep.moveTo(closestDamagedStructure);
			} else {
				var closest_source = creep.pos.findClosestByPath(FIND_SOURCES);
				if (creep.harvest(closest_source) === ERR_NOT_IN_RANGE) {
					creep.moveTo(closest_source);
				}
				var closestStructure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
					filter: (structure) => (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity
				});
				if (closestStructure != undefined && creep.transfer(closestStructure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
					creep.moveTo(closestStructure);
				}
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

module.exports = roleRepairer;