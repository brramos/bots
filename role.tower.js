function run(towerId) {
	let tower = Game.getObjectById(towerId);
	if(tower) {
		let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
		});
		if(closestDamagedStructure) {
			tower.repair(closestDamagedStructure);
		}

		let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(closestHostile) {
			tower.attack(closestHostile);
		}
	}
}

module.exports = {
	run: run
};