import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { AnimationModel } from '../models';
import { Store } from '@ngrx/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { map, take } from 'rxjs';
import { LoadingScreenState } from '../../loading-screen/store/loading-screen.state';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appAnimation]'
})
export class AnimationDirective implements OnInit {

  @Input() appAnimation!: AnimationModel;

  private readonly loadinScreenStore: Store<LoadingScreenState> = inject(Store);
  private readonly elementRef: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    this.loadinScreenStore.select(LoadingScreenState.selectLoadingScreen).pipe(
      take(1),
      map((res) => {
        gsap.fromTo(`#${this.elementRef.nativeElement.id}`, {
          opacity: 0,
          left: `${this.appAnimation.left}px`,
          top: `${this.appAnimation.top}px`
        }, {
          opacity: 1,
          left: 0,
          top: 0,
          duration: 1,
          delay: res ? this.appAnimation.delayLoading : this.appAnimation.delayNormal,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: `#${this.elementRef.nativeElement.id}`,
            start: `top ${this.appAnimation.topStart}%`,
            end: "top 30%",
            toggleActions: "play none none none"
          }
        })

        return;
      })
    ).subscribe()
  }
}
