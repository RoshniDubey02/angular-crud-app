import { Component } from '@angular/core';
import { ApiService } from '../Service/api-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-user',
  imports: [MatTableModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
displayedColumns: string[] = ['id', 'name', 'username', 'email', 'company'];

 ELEMENT_DATA:any[]=[]
 dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.get()
  }
  get() {
    this.apiService.getData().subscribe({
      next: (res: any) => {
        this.ELEMENT_DATA = res
        this.dataSource.data = this.ELEMENT_DATA
      }, error: (err: any) => {

      }
    })
  }
}
