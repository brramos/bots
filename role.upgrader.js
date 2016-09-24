let roleHarvester = require('role.harvester');

function run(creep) {
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
		roleHarvester.run(creep);
	}
}

module.exports = {
	run: run
};