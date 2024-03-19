import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeesService } from '../../../services/employees.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {
  
  httpService = inject(EmployeesService);
  router = inject(Router);
  employees: Employee[] = [];

  constructor() {}

  ngOnInit(): void {
    this.httpService.getAllEmployees()
    .subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteEmployee(id: number) {
    this.httpService.deleteEmployee(id).subscribe(() => {
      this.router.navigateByUrl('/employees');
    });
  }
}