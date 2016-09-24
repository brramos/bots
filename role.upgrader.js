var roleUpgrader = {
	run: function (creep) {
		if (creep.memory.working && creep.carry.energy === 0) {
			creep.memory.working = false;
			creep.say('harvesting');
		} else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
			creep.memory.working = true;
			creep.say('upgrading');
		}

		if (creep.memory.working && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
		else {
			var source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (structure) => structure.structureType === STRUCTURE_CONTAINER
			});
			if (creep.transfer(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	}
};

module.exports = roleUpgrader;