var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports = {
	run: function () {
		for (let name in Game.creeps) {
			let creep = Game.creeps[name];

			if (creep.memory.role == 'harvester') {
				creep.say('H');
				roleHarvester.run(creep);
			} else if (creep.memory.role == 'upgrader') {
				creep.say('U');
				roleUpgrader.run(creep);
			} else if (creep.memory.role == 'builder') {
				creep.say('B');
				roleBuilder.run(creep);
			} else if (creep.memory.role == 'repairer') {
				creep.say('R');
				roleRepairer.run(creep);
			}
		}
	}
};