let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleTower = require('role.tower');

function run() {
	roleTower.run('57e2836befd0648323e9dd95');
	roleTower.run('57f61d89f12c59c91ad8c090');

	for (let name in Game.creeps) {
		let creep = Game.creeps[name];

		if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		} else if (creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		} else if (creep.memory.role == 'repairer') {
			roleRepairer.run(creep);
		}
	}
}

module.exports = {
	run: run
};