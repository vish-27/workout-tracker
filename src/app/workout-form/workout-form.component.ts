import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [
    FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {
  name: string = '';
  workoutType: string = '';
  minutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.name && this.workoutType && this.minutes > 0) {
      this.workoutService.addWorkout(this.name, this.workoutType, this.minutes);
      this.name = '';
      this.workoutType = '';
      this.minutes = 0;
    }
  }
}
