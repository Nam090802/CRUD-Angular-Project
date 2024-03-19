import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseApiUrl = 'https://localhost:7207'
  http = inject(HttpClient);
  constructor() { }

  getAllEmployees() {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees');
  }

  addEmployee(addEmployRequest: Employee) {
    return this.http.post(this.baseApiUrl + '/api/employees', addEmployRequest);
  }

  getEmployee(id: string) { 
    return this.http.get<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }

  updateEmployee(id: number, updateEmployeeRequest: Employee ) {
    return this.http.put<Employee>(this.baseApiUrl + '/api/employees/' + id, updateEmployeeRequest);
  }

  deleteEmployee(id: number) {
    return this.http.delete<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }
}
