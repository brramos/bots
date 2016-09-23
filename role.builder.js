var roleBuilder = {
	run: function (creep) {
		if (creep.memory.working && creep.carry.energy === 0) {
			creep.memory.working = false;
			creep.say('harvesting');
		} else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
			creep.memory.working = true;
			creep.say('building');
		}

		if (creep.memory.working) {
			var construction_site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (construction_site != undefined) {
				creep.memory.isConstructionSite = true;
				if (creep.build(construction_site) === ERR_NOT_IN_RANGE) {
					creep.moveTo(construction_site);
				}
			} else {
				creep.memory.isConstructionSite = false;
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

module.exports = roleBuilder;