import { gameMap } from './map';
import { config } from './config';

class Collision {

	serial = 0;

	tick() {
		const show = Math.random() > 0.5;
		this.checkBox(show);
		this.checkBox(!show);
		this.checkBoundary();
	}

	checkBox(show: boolean) {
		const b = show ? gameMap.ballA : gameMap.ballB;
		const rx = Math.floor(b.x);
		const checkX = b.x - rx;
		const x = [rx];
		let cx = true;
		if (b.speedX < 0 && checkX <= config.r) {
			x.push(rx - 1);
		} else if (b.speedX > 0 && checkX >= (1 - config.r)) {
			x.push(rx + 1);
		} else {
			cx = false;
		}
		const ry = Math.floor(b.y);
		const checkY = b.y - ry;
		const y = [ry];
		let cy = true;
		if (b.speedY < 0 && checkY <= config.r) {
			y.push(ry - 1);
		} else if (b.speedY > 0 && checkY >= (1 - config.r)) {
			y.push(ry + 1);
		} else {
			cy = false;
		}
		if (!cx && !cy) {
			return;
		}

		let isCollX = false;
		let isCollY = false;
		for (const tx of x) {
			for (const ty of y) {
				const box = gameMap.getBox(tx, ty);
				if (!box) {
					continue;
				}
				if (box.show != show) {
					continue;
				}
				if (cx) {
					box.show = !show;
					isCollX = true;
				}
				if (cy) {
					box.show = !show;
					isCollY = true;
				}
			}
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
		for (const b of [gameMap.ballA, gameMap.ballB]) {
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
}

export const collision = new Collision();
