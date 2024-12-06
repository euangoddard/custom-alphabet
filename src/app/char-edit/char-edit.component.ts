import {
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { sign } from 'crypto';

@Component({
  selector: 'cus-char-edit',
  imports: [],
  templateUrl: './char-edit.component.html',
})
export class CharEditComponent implements OnInit {
  uri = input.required<string | null>();
  save = output<string>();

  protected readonly captureCanvas =
    viewChild<ElementRef<HTMLCanvasElement>>('capture');

  private isCapturing = signal(false);

  ngOnInit(): void {
    const uri = this.uri();
    if (uri) {
      const image = new Image();
      image.src = uri;
      image.onload = () => {
        const { canvas, context } = this.getCanvasAndContext();
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };
    }
  }

  startCapture(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isCapturing.set(true);
    const { context, canvas } = this.getCanvasAndContext();
    const { x, y } = this.getCanvasRelXY(event, canvas);
    context.lineWidth = 4;
    context.moveTo(x, y);
  }

  stopCapture(): void {
    this.isCapturing.set(false);
  }

  moveOnCanvas(event: MouseEvent | TouchEvent): void {
    if (this.isCapturing()) {
      event.preventDefault();
      const { context, canvas } = this.getCanvasAndContext();
      const { x, y } = this.getCanvasRelXY(event, canvas);
      context.lineWidth = 10;
      context.lineTo(x, y);
      context.stroke();
    }
  }

  clear(): void {
    const { context, canvas } = this.getCanvasAndContext();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
  }

  saveCanvasData(): void {
    const { canvas } = this.getCanvasAndContext();
    this.save.emit(canvas.toDataURL('image/png'));
  }

  private getCanvasAndContext(): CanvasAndContext {
    const canvas = this.captureCanvas()?.nativeElement as HTMLCanvasElement;
    return { canvas, context: canvas.getContext('2d')! };
  }

  private getCanvasRelXY(
    event: MouseEvent | TouchEvent,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    let touch: Touch | MouseEvent;
    if ('changedTouches' in event) {
      touch = event.changedTouches[0];
    } else {
      touch = event;
    }
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }
}

interface CanvasAndContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}
