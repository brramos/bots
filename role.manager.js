var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports = {
	run: function () {
		for (let name in Game.creeps) {
			var creep = Game.creeps[name];

			if (creep.memory.role == 'harvester') {
				roleHarvester.run(creep);
			} else if (creep.memory.role == 'upgrader') {
				roleUpgrader.run(creep);
			} else if (creep.memory.role == 'builder') {
				if (creep.memory.isConstructionSite) {
					roleBuilder.run(creep);
				}
				else {
					roleUpgrader.run(creep);
				}
			} else if (creep.memory.role == 'repairer') {
				if (creep.memory.isDamagedStructure) {
					roleRepairer.run(creep);
				} else {
					creep.memory.isConstructionSite = true;
					roleBuilder.run(creep);
				}
			}
		}
	}
};