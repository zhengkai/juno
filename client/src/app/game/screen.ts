import { config } from './config';

class Screen {

	w = 100;
	h = 100;

	grid = 3;

	merginLeft = 0;
	marginTop = 0;

	cal() {
		const ww = window.innerWidth;
		const wh = window.innerHeight;
		const gw = ww / config.w;
		const gh = wh / config.h;

		this.grid = Math.max(3, Math.floor(Math.min(gw, gh)));

		this.w = this.grid * config.w;
		this.h = this.grid * config.h;

		this.merginLeft = Math.floor((ww - this.w) / 2);
		this.marginTop = Math.floor((wh - this.h) / 2);
	}

	pos(x: number, y: number) {
		return [
			this.merginLeft + x * this.grid,
			this.marginTop + y * this.grid,
		];
	}
}

export const screen = new Screen();
