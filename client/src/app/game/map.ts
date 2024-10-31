import { config } from './config';
import { Graphics } from 'pixi.js';

export interface Box {
	x: number;
	y: number;
	show: boolean;
	prevShow: boolean;
	g: Graphics;
}
export interface Ball {
	x: number;
	y: number;
	show: boolean;
	color: number;
	g: Graphics;
	speedX: number;
	speedY: number;
}

class GameMap {

	list: Box[] = [];

	ballA: Ball = {
		x: 0,
		y: 0,
		show: true,
		g: new Graphics(),
		color: config.colorA,
		speedX: - config.speed / config.fps,
		speedY: - config.speed / config.fps * 1.01,
	};

	ballB: Ball = {
		x: 0,
		y: 0,
		show: false,
		g: new Graphics(),
		color: config.colorB,
		speedX: - config.speed / config.fps * 1.01,
		speedY: - config.speed / config.fps,
	};

	constructor() {
		this.init();
	}

	ball() {
		if (config.debug) {
			return [this.ballA];
		}
		return [this.ballA, this.ballB];
	}

	init() {
		for (let y = 0; y < config.h; y++) {
			for (let x = 0; x < config.w; x++) {
				const box = <Box>{
					x,
					y,
					show: Math.random() > 0.5,
					g: new Graphics(),
				};
				if (config.debug) {
					box.show = true;
				}
				this.list.push(box);
			}
		}

		for (const b of this.ball()) {
			let rx = Math.random() * config.w;
			let ry = Math.random() * config.h;
			if (config.debug) {
				rx = 1.5;
				ry = 1.5;
			}

			b.x = rx;
			b.y = ry;
			if (config.debug) {
				const li = [
					[1, 0],
					[1, 1],
					[1, 2],
				];
				for (const [x, y] of li) {
					const box = this.getBox(x, y);
					if (box) {
						box.show = false;
					}
				}
			} else {
				const round = [-1, 0, 1];
				for (const ox of round) {
					for (const oy of round) {
						const box = this.getBox(rx + ox, ry + oy);
						if (box) {
							box.show = false;
						}
					}
				}
			}
		}
	}

	getBox(x: number, y: number): Box|null {
		if (x < 0 || y < 0) {
			return null;
		}
		x = Math.floor(x);
		if (x >= config.w) {
			return null;
		}
		y = Math.floor(y);
		if (y >= config.h) {
			return null;
		}
		return this.list[y * config.w + x];
	}
}

export const gameMap = new GameMap();
