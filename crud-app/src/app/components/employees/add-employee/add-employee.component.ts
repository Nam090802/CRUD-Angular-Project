import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { EmployeesService } from '../../../services/employees.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(EmployeesService);
  router = inject(Router);
  addEmployRequest: Employee = {
    name: '',
    email: '',
    phone: '',
    salary: 0,
    department: '',
    id: 0
  }

  addEmployee() {
    this.httpService.addEmployee(this.addEmployRequest).subscribe(() => {
      alert('Thêm nhân viên thành công')
      this.router.navigateByUrl('/employees');
    })
  }
}
