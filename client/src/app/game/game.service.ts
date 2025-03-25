import { Injectable } from '@angular/core';
import { collision } from './collision';
import { config } from './config';
import { draw } from './draw';

@Injectable({
	providedIn: 'root',
})
export class GameService {

	constructor() {
		draw.start();

		this.loop();
	}

	loop() {
		window.setInterval(() => {
			collision.tick();
		}, 1000 / config.fps);
	}

	noop() {
		//
	}
}
