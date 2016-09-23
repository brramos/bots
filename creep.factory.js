require('prototype.spawn')();

function removeCreepsFromMemory() {
	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}
}

function logCreateCreepForRoleResponse(role, creepCount, memory) {
	var energy = Game.spawns.Alpha.room.energyAvailable;
	console.log('role: ' + role + ' | ' + creepCount + ' creeps | response: ' + Game.spawns.Alpha.createCustomCreep(energy, memory));
}

function createCreepForRole(role) {
	var creeps = GetCountOfCreepsForRole(role);

	if (role === 'harvester' && creeps < 10) {
		logCreateCreepForRoleResponse(role, creeps, {
			role: role,
			working: false
		});
	}
	if (role === 'upgrader') {
		if (creeps < 4) {
			logCreateCreepForRoleResponse(role, creeps, {
				role: role,
				working: false
			});
		}
	}
	if (role === 'builder') {
		if (creeps < 4) {
			logCreateCreepForRoleResponse(role, creeps, {
				role: role,
				working: false,
				isConstructionSite: true
			});
		}
	}
	if (role === 'repairer') {
		if (creeps < 4) {
			logCreateCreepForRoleResponse(role, creeps, {
				role: role,
				working: false,
				isDamagedStructure: true
			});
		}
	}
}

function GetCountOfCreepsForRole(role) {
	return _.sum(Game.creeps, (creep) => creep.memory.role === role);
}

var creepFactory = {
	create: function () {
		removeCreepsFromMemory();

		createCreepForRole('harvester');

		createCreepForRole('repairer');

		createCreepForRole('upgrader');

		createCreepForRole('builder');

	}
};

module.exports = creepFactory;