import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutService } from '../workout.service';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutServiceSpy: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, WorkoutFormComponent],
      providers: [
        { provide: WorkoutService, useValue: spy }
      ]
    }).compileComponents();

    workoutServiceSpy = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form fields', () => {
    expect(component.name).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });

  it('should not call addWorkout when form is invalid', () => {
    component.addWorkout();
    expect(workoutServiceSpy.addWorkout).not.toHaveBeenCalled();
  });

  it('should call addWorkout when form is valid', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.addWorkout();

    expect(workoutServiceSpy.addWorkout).toHaveBeenCalledWith('John Doe', 'Running', 30);
  });

  it('should reset form fields after successful submission', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 30;

    component.addWorkout();

    expect(component.name).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBe(0);
  });

  it('should not reset form fields if submission is invalid', () => {
    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.minutes = 0; // Invalid minutes

    component.addWorkout();

    expect(component.name).toBe('John Doe');
    expect(component.workoutType).toBe('Running');
    expect(component.minutes).toBe(0);
  });
});