import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor (private http:HttpClient){}

  getData(){
    return this.http.get(this.baseUrl)
  }
}
