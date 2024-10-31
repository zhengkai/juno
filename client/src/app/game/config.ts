class Config {
	w = 16 * 2;
	h = 9 * 2;
	r = 0.24;
	fps = 120;
	speed = 10;

	vector = 2;

	debug = false;
	debugSerial = 16;

	colorA = 0xBC6C25;
	colorB = 0xFFFFFF;

	constructor() {
		if (this.debug) {
			this.fps = 2;
			this.speed = 0.2;
			this.w = 7;
			this.h = 9;
		}
		this.speed /= this.fps;
	}
}

export const config = new Config();
