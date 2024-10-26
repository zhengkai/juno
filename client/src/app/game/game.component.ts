import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-game',
	standalone: true,
	imports: [],
	templateUrl: './game.component.html',
})
export class GameComponent implements AfterViewInit {

	@ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.resizeCanvas();
		this.draw(); // 重绘内容
	}

	resizeCanvas() {
		const canvas = this.canvasRef.nativeElement;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	ngAfterViewInit() {
		this.resizeCanvas();
		this.draw();
	}

	draw() {
		const canvas = this.canvasRef.nativeElement;

		console.log(canvas);
		const context = canvas.getContext('2d');

		if (context) {
			// 设置绘图样式
			context.fillStyle = 'blue';
			context.strokeStyle = 'red';
			context.lineWidth = 5;

			// 绘制一个圆
			context.beginPath();
			context.arc(200, 200, 50, 0, Math.PI * 2);
			context.fill();
			context.stroke();
		}
	}
}
