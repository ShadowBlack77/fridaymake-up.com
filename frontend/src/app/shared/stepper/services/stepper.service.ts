import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepperDirective } from '../directives/stepper.directive';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  public goToNextStep$ = new EventEmitter<void>();

  private currentStepIndex = new BehaviorSubject<number>(1);
  private totalSteps = new BehaviorSubject<number>(0);

  public currentStepIndex$ = this.currentStepIndex.asObservable();
  public totalSteps$ = this.totalSteps.asObservable();

  public stepperDirective!: StepperDirective;

  public invokeGoToNextStep(): void {
    this.goToNextStep$.emit();
  }

  public loadStep(step: number): void {
    this.currentStepIndex.next(step);
  }

  public goToNextStep(): void {
    if (this.currentStepIndex.value < this.totalSteps.value) {
      this.currentStepIndex.next(this.currentStepIndex.value + 1);
    }
  }

  public goToPreviousStep(): void {
    if (this.currentStepIndex.value > 0) {
      this.currentStepIndex.next(this.currentStepIndex.value - 1);
    }
  }

  public setTotalSteps(stepsCount: number): void {
    this.totalSteps.next(stepsCount);
  }
}
