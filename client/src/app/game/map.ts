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
	g: Graphics;
	speedX: number;
	speedY: number;
}

class GameMap {

	list: Box[] = [];

	ball: Ball = {
		x: 0,
		y: 0,
		show: true,
		g: new Graphics(),
		speedX: config.speed / config.fps,
		speedY: config.speed / config.fps,
	};

	constructor() {
		this.init();
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
				this.list.push(box);
			}
		}

		const rx = Math.floor(Math.random() * config.w);
		const ry = Math.floor(Math.random() * config.h);

		const b = this.ball;
		b.x = rx + 0.5;
		b.y = ry + 0.5;

		const round = [-1, 0, 1];
		for (const ox of round) {
			for (const oy of round) {
				const box = this.getBox(rx + ox, ry + oy);
				box.show = false;
			}
		}
	}

	getBox(x: number, y: number) {
		x = Math.max(0, Math.min(config.w - 1, x));
		y = Math.max(0, Math.min(config.h - 1, y));
		return this.list[y * config.w + x];
	}
}

export const gameMap = new GameMap();
