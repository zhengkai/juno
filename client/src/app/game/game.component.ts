import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
	selector: 'app-game',
	standalone: true,
	imports: [],
	templateUrl: './game.component.html',
})
export class GameComponent {

	constructor(
		private gs: GameService,
	) {
		this.gs.noop();
	}
}
