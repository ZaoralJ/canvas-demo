import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { BindingDef } from '@angular/core/src/view';
import { injectElementRef } from '@angular/core/src/render3/view_engine_compatibility';

@Component({
  selector: 'app-module-grinders',
  templateUrl: './module-grinders.component.html',
  styleUrls: ['./module-grinders.component.css']
})
export class ModuleGrindersComponent implements OnInit, AfterViewInit {

  private canvasEl: HTMLCanvasElement;
  private cx: CanvasRenderingContext2D;
  private magic = 50;
  private canvasWidth = 1090;
  private canvasHeight = 470;
  private elements: Element[] = [];
  private binded: boolean;
  private actualRatio: number;
  private defaultColor: string = 'pink';

  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // get the context
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    // set the width and height
    this.setCanvasSize();

    this.canvasEl.addEventListener('click', e => {
      const x = (e.clientX - this.canvasEl.offsetLeft) / this.actualRatio;
      const y = (e.clientY - this.canvasEl.offsetTop) / this.actualRatio;

      var element = this.elements.find(e => x >= e.x1 && x <= e.x2 && y >= e.y1 && y <= e.y2)

      if (element != null) {
        switch (element.color) {
          case this.defaultColor: {
            element.color = 'green';
            break;
          }
          case 'green': {
            element.color = 'yellow';
            break;
          }
          case 'yellow': {
            element.color = 'red';
            break;
          }
          case 'red': {
            element.color = 'green';
            break;
          }
        }

        this.draw(this.cx);
      }
    });

    this.draw(this.cx);
    this.binded = true;
  }

  private draw(cx: CanvasRenderingContext2D) {
    const xRatio = (window.innerWidth - this.magic) / this.canvasWidth;
    const yRatio = (window.innerHeight - this.magic) / this.canvasHeight;

    this.actualRatio = yRatio < xRatio ? yRatio : xRatio;
    if (this.actualRatio > 0) {
      this.canvasEl.width = this.canvasWidth * this.actualRatio;
      this.canvasEl.height = this.canvasHeight * this.actualRatio;
      cx.scale(this.actualRatio, this.actualRatio);
    }
    else {
      this.canvasEl.width = 0;
      this.canvasEl.height = 0;
      cx.scale(0, 0);
    }

    for (let index = 0; index < 12; index++) {
      // row 0
      this.drawModule(this.cx, 10 + 90 * index, 10, 'Row0_' + index);
      // row 1
      this.drawModule(this.cx, 10 + 90 * index, 240, 'Row1_' + index);
    }
  }

  private drawModule(cx: CanvasRenderingContext2D, x: number, y: number, module: string) {
    cx.fillStyle = 'lightGrey';
    cx.beginPath();
    cx.fillRect(x, y, 80, 220);
    cx.stroke();

    for (let index = 0; index < 3; index++) {

      if (!this.binded) {
        const newElement = new Element(x + 10, y + 10 + index * 70, x + 10 + 60, y + 10 + index * 70 + 60, module + ', Element ' + index, this.defaultColor);
        this.elements.push(newElement);
      }

      var element = this.elements.find(e => x + 10 >= e.x1 && x + 10 <= e.x2 && y + 10 + index * 70 >= e.y1 && y + 10 + index * 70 <= e.y2);
      cx.fillStyle = element.color;
      cx.fillRect(x + 10, y + 10 + index * 70, 60, 60);
    }

    cx.stroke();
  }

  // resize window event
  @HostListener('window:resize')
  onWindowResize() {
    this.draw(this.cx);
  }

  private setCanvasSize() {
    this.canvasEl.width = window.innerWidth - this.magic;
    this.canvasEl.height = window.innerHeight - this.magic;
  }

}

class Element {
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    public comment: string,
    public color: string
  ) { }
}

