import { Component, Input } from '@angular/core';
import { User } from '../workout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ user.name }}'s workout progress</h2>
    <div> <canvas class="chart">
      <div *ngFor="let workout of user.workouts" class="bar" [style.height.px]="workout.minutes * 2">
        <span class="bar-label">{{ workout.type }}</span>
        <span class="bar-value">{{ workout.minutes }} min</span>
      </div>
      </canvas>
    </div>
  `,
  styles: [`
    .chart {
      display: flex;
      align-items: flex-end;
      height: 200px;
      gap: 10px;
    }
    .bar {
      width: 60px;
      background-color: lightblue;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
    }
    .bar-label {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
    }
    .bar-value {
      font-weight: bold;
    }
  `]
})
export class WorkoutChartComponent {
  @Input() user!: User;
}