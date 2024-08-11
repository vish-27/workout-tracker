import { TestBed } from '@angular/core/testing';
import { WorkoutService, User, Workout } from './workout.service';
import { PLATFORM_ID } from '@angular/core';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let localStorageMock: { getItem: jasmine.Spy, setItem: jasmine.Spy };

  beforeEach(() => {
    localStorageMock = {
      getItem: jasmine.createSpy('getItem'),
      setItem: jasmine.createSpy('setItem')
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load default users if localStorage is empty', () => {
    localStorageMock.getItem.and.returnValue(null);

    service = TestBed.inject(WorkoutService);

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(3);
      expect(users[0].name).toBe('John Doe');
      expect(users[0].workouts.length).toBe(2);
    });
  });


  it('should add a workout to an existing user', () => {
    service.addWorkout('John Doe', 'Weightlifting', 60);

    service.getUsers().subscribe(users => {
      const johnDoe = users.find(u => u.name === 'John Doe');
      expect(johnDoe?.workouts.length).toBe(3);
      expect(johnDoe?.workouts[2]).toEqual({ type: 'Weightlifting', minutes: 60 });
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('should add a new user with a workout if the user does not exist', () => {
    service.addWorkout('New User', 'Yoga', 45);

    service.getUsers().subscribe(users => {
      const newUser = users.find(u => u.name === 'New User');
      expect(newUser).toBeTruthy();
      expect(newUser?.workouts).toEqual([{ type: 'Yoga', minutes: 45 }]);
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

});