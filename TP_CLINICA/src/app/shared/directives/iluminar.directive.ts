import { AnimationBuilder, keyframes, style } from '@angular/animations';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIluminar]'
})
export class IluminarDirective {  
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2, 
  ) {
    this.iniciar();
  }

  iniciar(){
    this.renderer.addClass(this.elementRef.nativeElement, 'titulo-luminoso');
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '48px');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'wheat');
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', 'bold');

  }
}
