class Util {

	randBool() {
		return Math.random() > 0.5;
	}

	randSpeed(speed = 1) {
		return Math.random() * 0.9 * speed;
	}

	otherSpeed(speed: number, original: number = 1) {
		let s = Math.sqrt(1 - speed * speed);
		if (original < 0) {
			s *= -1;
		}
		return s;
	}
}

export const util = new Util();
