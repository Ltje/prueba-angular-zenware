import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DummyApiService {
  post = 'https://dummy.restapiexample.com/api/v1/create';
  update = 'https://dummy.restapiexample.com/api/v1/update/';
  employees = 'https://dummy.restapiexample.com/api/v1/employees';
  employee = 'https://dummy.restapiexample.com/api/v1/employee/';
  delUrl = 'https://dummy.restapiexample.com/api/v1/delete/'
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.employees).pipe(timeout(10000));
  }
  getUserById(id: number) {
    return this.http.get(`${this.employee}${id}`);
  }

  addUser(data: any) {
    return this.http.post(`${this.post}`, data)
  }
  deleteById(id: number) {
    return this.http.delete(`${this.delUrl}${id}`)
  }
  updateUserById(id: number, data) {
    return this.http.put(`${this.update}${id}`, data)
  }
}
