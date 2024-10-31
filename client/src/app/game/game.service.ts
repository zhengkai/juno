import { Injectable } from '@angular/core';
import { Application, Container, Graphics } from 'pixi.js';
import { gameMap } from './map';
import { screen } from './screen';
import { config } from './config';
import { collision } from './collision';

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
			collision.tick();
		}, 1000 / config.fps);
	}

	initDraw() {

		const app = this.app;

		screen.cal();

		const bc = new Container();
		const [x, y] = screen.pos(0, 0);
		bc.position.set(x, y);
		app.stage.addChild(bc);

		const back = new Graphics();
		back.rect(0, 0, screen.grid * config.w, screen.grid * config.h).fill(config.colorB).stroke({ width: 0 });
		bc.addChild(back);

		for (const box of gameMap.list) {
			const g = box.g;
			g.rect(box.x * screen.grid, box.y * screen.grid, screen.grid, screen.grid).fill(config.colorA).stroke({ width: 0 });
			g.visible = box.show;
			bc.addChild(g);
		}

		for (const b of gameMap.ball()) {
			const g = b.g;
			g.circle(0, 0, screen.grid * config.r).fill(b.color).stroke({ width: 0 });
			app.stage.addChild(g);
		}

		/*
		const t = new Graphics();
		t.circle(0, 0, screen.grid * config.r).fill(0x00FFFF).stroke({ width: 0 });
		app.stage.addChild(t);
		t.position.set(config.r * screen.grid, config.r * screen.grid);
		 */

		app.ticker.add(() => {
			this.refresh();
		});
	}

	refresh() {
		for (const box of gameMap.list) {
			box.g.visible = box.show;
		}
		for (const b of gameMap.ball()) {
			const [x, y] = screen.pos(b.x, b.y);
			b.g.position.set(x, y);
		}
	}
}
