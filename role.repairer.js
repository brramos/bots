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
				creep.memory.isDamagedStructure = false;
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