module.exports = function () {
	StructureSpawn.prototype.createCustomCreep = function (energy, options) {
		let cost = 200;
		let numberOfParts = Math.floor(energy / cost);
		let body = [];

		for (let i = 0; i < numberOfParts; i++) {
			body.push(WORK);
		}
		for (let i = 0; i < numberOfParts; i++) {
			body.push(CARRY);
		}
		for (let i = 0; i < numberOfParts; i++) {
			body.push(MOVE);
		}
		if (body.length > 0) {
			return this.createCreep(body, undefined, options);
		}
		return 'not enough energy';
	};
};