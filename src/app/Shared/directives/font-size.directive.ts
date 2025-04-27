import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appFontSize]',
  standalone: false
})
export class FontSizeDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setFontSize();
  }

  private setFontSize(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}