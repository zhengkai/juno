import { Injectable } from '@angular/core';
import { Application, Graphics } from 'pixi.js';
import { gameMap } from './map';
import { screen } from './screen';
import { config } from './config';

@Injectable({
	providedIn: 'root',
})
export class GameService {

	app = new Application();
	serial = 0;

	constructor() {
		(async () => {
			await this.app.init({ background: 0xEEEEEE, resizeTo: window });
			document.body.appendChild(this.app.canvas);

			this.start();
		})();
	}

	async start() {
		this.initDraw();
		window.setInterval(() => {
			this.tick();
		}, 1000 / config.fps);
	}

	tick() {
		this.serial++;
		const b = gameMap.ball;
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

	initDraw() {

		const app = this.app;

		screen.cal();

		for (const box of gameMap.list) {
			const g = box.g;
			const [x, y] = screen.pos(box.x, box.y);
			g.rect(x, y, screen.grid, screen.grid).fill(0xFF0000).stroke({ width: 0 });
			g.visible = box.show;
			app.stage.addChild(g);
		}

		const b = gameMap.ball;
		const g = b.g;
		g.circle(0, 0, screen.grid * config.r).fill(0x000000).stroke({ width: 0 });
		app.stage.addChild(g);

		app.ticker.add(() => {
			this.refresh();
		});
	}

	refresh() {
		for (const box of gameMap.list) {
			box.g.visible = box.show;
		}
		const b = gameMap.ball;
		const [x, y] = screen.pos(b.x, b.y);
		b.g.position.set(x, y);
	}
}
