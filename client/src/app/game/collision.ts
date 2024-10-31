import { gameMap } from './map';
import { config } from './config';

class Collision {

	serial = 0;

	tick() {
		this.serial++;
		if (config.debug && this.serial > 6) {
			return;
		}
		// console.log(this.serial);
		const show = Math.random() > 0.5;
		this.checkBox(show);
		this.checkBox(!show);
		this.checkBoundary();
	}

	checkBox(show: boolean) {
		if (!show && config.debug) {
			return;
		}
		const b = show ? gameMap.ballA : gameMap.ballB;

		const [x, xn] = this.checkBoxOneAxis(b.x, b.speedX);
		const [y, yn] = this.checkBoxOneAxis(b.y, b.speedY);
		if (xn === 0 && yn === 0) {
			return;
		}

		let isCollX = false;
		let isCollY = false;

		if (xn != 0) {
			isCollX = this.checkBoxPoint(x + xn, y, show);
		}
		if (yn != 0) {
			isCollY = this.checkBoxPoint(x, y + yn, show);
		}
		// console.log(isCollX, isCollY);
		if (!isCollX && !isCollY) {
			isCollY = isCollX = this.checkBoxPoint(x + xn, y + yn, show);
		}

		if (isCollX) {
			b.speedX *= -1;
			b.x += b.speedX;
		}
		if (isCollY) {
			b.speedY *= -1;
			b.y += b.speedY;
		}
	}

	checkBoundary() {
		for (const b of gameMap.ball()) {
			b.x += b.speedX;
			if (b.x < config.r || b.x > (config.w - config.r)) {
				b.speedX *= -1;
				b.x += b.speedX;
			}
			b.y += b.speedY;
			if (b.y < config.r || b.y > (config.h - config.r)) {
				b.speedY *= -1;
				b.x += b.speedX;
			}
		}
	}

	checkBoxOneAxis(axis: number, speed: number) {
		const f = Math.floor(axis);
		const check = axis - f;
		let an = 0;
		if (speed < 0 && check <= config.r) {
			an = -1;
		} else if (speed > 0 && check >= (1 - config.r)) {
			an = 1;
		}
		return [f, an];
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
