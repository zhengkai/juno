import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './bootstrap.component.html',
})
export class BootstrapComponent {
	title = 'Juno';
}
