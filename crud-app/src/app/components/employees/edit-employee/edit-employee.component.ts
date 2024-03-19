import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { response } from 'express';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  router = inject(Router);
  httpService = inject(EmployeesService);
  route = inject(ActivatedRoute);

  employeeDetails: Employee = {
    name: '',
    email: '',
    phone: '',
    salary: 0,
    department: '',
    id: 0
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        console.log(params);
        const id = (params.get('id'));
        if (id) {
          this.httpService.getEmployee(id).subscribe({
            next: response => {
              console.log(response);
              this.employeeDetails = response; 
            }
          })
        }
      }
    })
  }

  updateEmployee() {
    this.httpService.updateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe({
      next: employee => {
        alert('Sửa thông tin thành công')
        this.router.navigate(['employees']);
      }
    })
  }
}
