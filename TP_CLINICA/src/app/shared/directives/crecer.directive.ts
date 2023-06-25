import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCrecer]'
})
export class CrecerDirective {
  constructor(private item: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.aplicar(true)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.aplicar(false)
  }

  private aplicar(crecer: any) {
    //FORMA 1
    this.renderer.setStyle(this.item.nativeElement, 'font-size', crecer ? '36px' : '24px');
    this.renderer.setStyle(this.item.nativeElement, 'font-weight', crecer ? 'bold' : '100');
    
    //FORMA 2
    //this.item.nativeElement.style.backgroundColor = color;   
   
  }

}
