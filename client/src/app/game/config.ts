class Config {
	w = 16 * 2;
	h = 9 * 2;
	r = 0.25;
	fps = 120;
	speed = 5;

	debug = false;

	colorA = 0xBC6C25;
	colorB = 0xFFFFFF;

	constructor() {
		if (this.debug) {
			this.fps = 2;
			this.speed = 0.2;

		}
	}
}

export const config = new Config();
