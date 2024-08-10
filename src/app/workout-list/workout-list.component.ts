import { Component, OnInit, ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';
import { WorkoutService, User } from '../workout.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);



@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [FormsModule,CommonModule, WorkoutChartComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit{
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  filterType: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  selectedUser: User | null = null;
  chart: Chart | null = null;

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;


  constructor(private workoutService: WorkoutService , private cdr: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.workoutService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterType === 'All' || user.workouts.some(w => w.type === this.filterType))
    );
    this.currentPage = 1;
  }

  getTotalWorkoutMinutes(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  getWorkoutTypes(user: User): string {
    return user.workouts.map(w => w.type).join(', ');
  }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pageCount = this.totalPages;
    const currentPage = this.currentPage;
    const pages: number[] = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Represents ellipsis
        pages.push(pageCount);
      } else if (currentPage >= pageCount - 3) {
        pages.push(1);
        pages.push(-1);
        for (let i = pageCount - 4; i <= pageCount; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(pageCount);
      }
    }

    return pages;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  selectUser(user: User) {
    this.selectedUser = this.selectedUser === user ? null : user;
    if (this.selectedUser) {
      setTimeout(() => {
        this.createChart();
      });
      // this.createChart();
    } else if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.cdr.detectChanges();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const workoutTypes = this.selectedUser!.workouts.map(w => w.type);
    const workoutMinutes = this.selectedUser!.workouts.map(w => w.minutes);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [{
          label: 'Workout Minutes',
          data: workoutMinutes,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Workout Type'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `${this.selectedUser!.name}'s Workout Progress`
          }
        }
      }
    });
  }

}
