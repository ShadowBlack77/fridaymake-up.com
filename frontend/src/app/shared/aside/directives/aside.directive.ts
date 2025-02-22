import { Directive, ElementRef, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appAside]',
  standalone: true
})
export class AsideDirective {

  private readonly elementRef: ElementRef = inject(ElementRef);
  private isAsideShow: WritableSignal<boolean> = signal(false);

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event) {
    if ((event.target as HTMLElement).closest('.ham-box')) {
      this.isAsideShow.update((isShow) => isShow = !isShow);

      if (this.elementRef.nativeElement.classList.contains('aside-navbar-menu')) {
        const asideSelector = this.elementRef.nativeElement.id;

        if (this.isAsideShow()) {
          this.showAside(asideSelector);
        } else {
          this.closeAside(asideSelector);
        }
      }
    }

    if (!event.target || !(event.target as HTMLElement).closest('.ham-box')) {
      this.isAsideShow.set(false);

      if (this.elementRef.nativeElement.classList.contains('aside-navbar-menu')) {
        const asideSelector = this.elementRef.nativeElement.id;
        this.closeAside(asideSelector);
      }
    }
  }

  @HostListener('document:scroll')
  public onScroll(): void {
    if(this.isAsideShow()) {
      this.isAsideShow.set(false);

      if (this.elementRef.nativeElement.classList.contains('aside-navbar-menu')) {
        const asideSelector = this.elementRef.nativeElement.id;
        this.closeAside(asideSelector);
      }
    }
  }

  private showAside(asideSelector: string): void {
    gsap.to(`#${asideSelector}`, {
      translateX: '0vw',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }

  private closeAside(asideSelector: string): void {
    gsap.to(`#${asideSelector}`, {
      translateX: '-100vw',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }
}
