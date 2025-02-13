import { AfterContentInit, Component, ContentChildren, inject, Input, OnDestroy, OnInit, QueryList, signal, WritableSignal } from '@angular/core';
import { StepperDirective } from '../../directives';
import { StepperService } from '../../services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() title: string = 'Ankieta Zapisu';

  @ContentChildren(StepperDirective) steps!: QueryList<any>;

  private readonly stepperService: StepperService = inject(StepperService);

  private destroy$: Subject<void> = new Subject<void>();

  public currentStepIndex: WritableSignal<number> = signal(1);
  public lengthOfSteps: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.stepperService.goToNextStep$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.next();
    })
  }

  ngAfterContentInit(): void {
    this.lengthOfSteps.set(this.steps.length);
    this.stepperService.setTotalSteps(this.steps.length);
    this.stepperService.currentStepIndex$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((index) => {
      this.currentStepIndex.set(index);
    });
    
    this.initializeStep();
  }

  public next(): void {
    this.stepperService.goToNextStep();
    this.initializeStep();
  }

  public prev(): void {
    if (this.currentStepIndex() !== 1) {
      this.stepperService.goToPreviousStep();
      this.initializeStep();
    }
  }

  public initializeStep(): void {
    const currentStep = this.steps.toArray()[this.currentStepIndex() - 1];

    if (this.currentStepIndex() <= this.lengthOfSteps()) {
      currentStep.currentInitializedStep.set(this.currentStepIndex());
      currentStep.allSteps.set(this.steps);
      currentStep.renderStep();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
