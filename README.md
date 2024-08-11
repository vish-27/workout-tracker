# Workout Tracker

This project allows user to track workout duration in the forms of tables and charts. This project is built using Angular 18.1.4.

## Assignment's solution details

-> Framework - Angular 18.1.4
-> It's a SPA that takes inputs like name, workout type and duration (in Minutes). The user details are showing in the form of tables
-> When clicking on any user we can see the progress chart for that user.
-> It also have a feature of searching by name and filter for workout type.

## Test Coverage

This project includes unit tests for one component and one service with 100% code coverage. ![Coverage Badge](https://img.shields.io/badge/coverage-100%25-brightgreen)

### Coverage Summary

| File                        | Statements | Branches | Functions | Lines |
|-----------------------------|------------|----------|-----------|-------|
| `src/app/workout-form`      | 100%       | 100%     | 100%      | 100%  |
| `src/app/workout.service`   | 100%       | 100%     | 100%      | 100%  |

You can view the full code coverage report by running the following command and opening the `index.html` file located in the `coverage/` directory:
```bash
ng test --code-coverage

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).