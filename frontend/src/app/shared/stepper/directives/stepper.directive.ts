import { Directive, ElementRef, inject, OnDestroy, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { StepperService } from '../services/stepper.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appStepper]',
  standalone: true
})
export class StepperDirective implements OnDestroy {

  private readonly stepperService: StepperService = inject(StepperService);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly elementRef: ElementRef = inject(ElementRef);

  private destory$: Subject<void> = new Subject<void>();

  public currentInitializedStep: WritableSignal<number> = signal(0);
  public allSteps: WritableSignal<any> = signal(null);

  public renderStep(): void {
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destory$)
    ).subscribe(() => {
      this.allSteps().toArray().map((element: any, index: any) => {
        if (index + 1 === this.currentInitializedStep()) {
          this.renderer.setStyle(this.allSteps().toArray()[index].elementRef.nativeElement, 'display', 'block');
        } else {
          this.renderer.setStyle(element.elementRef.nativeElement, 'display', 'none');
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
