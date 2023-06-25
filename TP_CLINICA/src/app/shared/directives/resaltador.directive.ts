import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltador]'
})
export class ResaltadorDirective {
  @Input() colorPrincipal: string = '';
  @Input('appResaltador') colorSecundario: string = '';
  constructor(private item: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.aplicar(this.colorSecundario || this.colorPrincipal || 'green')
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.aplicar(null)
  }

  private aplicar(color: any) {

    //FORMA 1
    this.renderer.setStyle(this.item.nativeElement, 'background-color', color);
    
    //FORMA 2
    //this.item.nativeElement.style.backgroundColor = color;
    
    if(color != null){
      this.renderer.setStyle(this.item.nativeElement, 'color', 'white');
      this.item.nativeElement.style.cursor = 'pointer';
    }else{
      this.renderer.setStyle(this.item.nativeElement, 'color', 'black');
    }
  }
}
