import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // READ
  getData() {
    return this.http.get(this.baseUrl);
  }

  // CREATE
  saveData(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  // UPDATE
  updateData(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // DELETE
  deleteData(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
