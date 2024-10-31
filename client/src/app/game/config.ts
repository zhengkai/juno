class Config {
	w = 16 * 2;
	h = 9 * 2;
	r = 0.4;
	fps = 120;
	speed = 10;

	debug = false;

	colorA = 0xBC6C25;
	colorB = 0xFFFFFF;

	constructor() {
		if (this.debug) {
			this.fps = 2;
			this.speed = 0.2;
			this.w = 7;
			this.h = 9;
		}
	}
}

export const config = new Config();
