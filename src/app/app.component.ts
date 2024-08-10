import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkoutListComponent, WorkoutFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fyle-assess';
}
