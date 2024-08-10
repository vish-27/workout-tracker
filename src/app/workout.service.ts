import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

export interface Workout {
  type: string;
  minutes: number;
}


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private users: User[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 40 }, { type: 'Running', minutes: 40 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 60 }, { type: 'Cycling', minutes: 30 }] }
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadFromLocalStorage();
    }
  }

  private loadFromLocalStorage() {
    if (this.isBrowser) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        // If no data in localStorage, use the default users and save them
        this.saveToLocalStorage();
      }
      this.usersSubject.next(this.users);
    }
  }

  private saveToLocalStorage() {
    if (this.isBrowser) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  getUsers() {
    return this.usersSubject.asObservable();
  }

  addWorkout(name: string, workoutType: string, minutes: number) {
    const user = this.users.find(u => u.name === name);
    if (user) {
      user.workouts.push({ type: workoutType, minutes });
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        name,
        workouts: [{ type: workoutType, minutes }]
      };
      this.users.push(newUser);
    }
    this.saveToLocalStorage();
    this.usersSubject.next(this.users);
  }
}