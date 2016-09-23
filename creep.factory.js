require('prototype.spawn')();

function removeCreepsFromMemory() {
	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}
}

function logCreateCreepForRoleResponse(role) {
	console.log(role + ' | ' + Game.spawns.Alpha.createCustomCreep(Game.spawns.Alpha.room.energyAvailable, {role: role, working: false}));
}

function createCreepForRole(role) {
	let creeps = _.sum(Game.creeps, (creep) => creep.memory.role === role);

	if (600 < Game.spawns.Alpha.room.energyAvailable) {
		if (role === 'harvester' && creeps < 10) {
			logCreateCreepForRoleResponse(role);
		}
		if (role === 'upgrader' && creeps < 2) {
			logCreateCreepForRoleResponse(role);
		}
		if (role === 'builder' && creeps < 2) {
			logCreateCreepForRoleResponse(role);
		}

		if (role === 'repairer' && creeps < 2) {
			logCreateCreepForRoleResponse(role);
		}
	}
}

module.exports = {
	create: function () {
		removeCreepsFromMemory();

		createCreepForRole('harvester');
		createCreepForRole('repairer');
		createCreepForRole('upgrader');
		createCreepForRole('builder');
	}
};