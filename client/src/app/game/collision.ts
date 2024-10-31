import { gameMap } from './map';
import { config } from './config';
import { util } from './util';

class Collision {

	serial = 0;

	tick() {
		this.serial++;
		if (config.debug && this.serial > config.debugSerial) {
			return;
		}
		// console.log(this.serial);
		const show = Math.random() > 0.5;

		this.ballMove();

		this.checkBox(show);
		this.checkBox(!show);
		this.checkBoundary();
	}

	checkBox(show: boolean) {
		if (!show && config.debug) {
			return;
		}
		const b = show ? gameMap.ballA : gameMap.ballB;

		const [x, xn, xc] = this.checkBoxOneAxis(b.x, b.speedX);
		const [y, yn, yc] = this.checkBoxOneAxis(b.y, b.speedY);
		if (xn === 0 && yn === 0) {
			return;
		}
		// console.log(x, y, x + xn, y + yn, !!xc, !!yc);

		let isCollX = false;
		let isCollY = false;

		if (xn != 0) {
			isCollX = this.checkBoxPoint(x + xn, y, show);
		}
		if (yn != 0) {
			isCollY = this.checkBoxPoint(x, y + yn, show);
		}

		if (!isCollX && !isCollY) {
			const opposite = this.checkBoxPoint(x + xn, y + yn, show);
			if (opposite) {
				isCollX = isCollY = true;
				if (util.randBool()) {
					b.speedX = util.randSpeed();
					b.speedY = util.otherSpeed(b.speedX, b.speedY);
				} else {
					b.speedY = util.randSpeed();
					b.speedX = util.otherSpeed(b.speedY, b.speedX);
				}
			} else if (yc) {
				if (!!xn && this.checkBoxPoint(x + xn, y + yc, show)) {
					b.speedX = util.randSpeed(b.speedX);
					if (util.randBool()) {
						b.speedX *= -1;
					}
					b.speedY = util.otherSpeed(b.speedX, b.speedY);
				}
			} else if (xc) {
				if (!!yn && this.checkBoxPoint(x + xc, y + yn, show)) {
					b.speedY = util.randSpeed(b.speedY);
					if (util.randBool()) {
						b.speedY *= -1;
					}
					b.speedX = util.otherSpeed(b.speedY, b.speedX);
				}
			}
		}

		if (isCollX) {
			b.speedX *= -1;
			b.x += b.speedX * config.speed;
		}
		if (isCollY) {
			b.speedY *= -1;
			b.y += b.speedY * config.speed;
		}
	}

	ballMove() {
		for (const b of gameMap.ball()) {
			b.x += b.speedX * config.speed;
			b.y += b.speedY * config.speed;
		}
	}

	checkBoundary() {
		for (const b of gameMap.ball()) {
			if (b.x < config.r || b.x > (config.w - config.r)) {
				b.speedX *= -1;
				b.x += b.speedX * config.speed;
			}
			if (b.y < config.r || b.y > (config.h - config.r)) {
				b.speedY *= -1;
				b.y += b.speedY * config.speed;
			}
		}
	}

	checkBoxOneAxis(axis: number, speed: number) {
		const f = Math.floor(axis);
		const check = axis - f;
		let an = 0;
		let corner = 0;
		if (speed < 0) {
			if (check <= config.r) {
				an = -1;
			} else if (check >= (1 - config.r)) {
				corner = 1;
			}
		} else if (speed > 0) {
			if (check >= (1 - config.r)) {
				an = 1;
			} else if (check <= config.r) {
				corner = -1;
			}
		}
		return [f, an, corner];
	}

	checkBoxPoint(x: number, y: number, show: boolean) {
		const box = gameMap.getBox(x, y);
		if (!box) {
			return false;
		}
		const re = box.show == show;
		if (re) {
			box.show = !show;
		}
		return re;
	}
}

export const collision = new Collision();
