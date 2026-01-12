import { Component } from '@angular/core';
import { ApiService } from '../Service/api-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, MatCardModule
  ],

  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'company', 'action'];

  ELEMENT_DATA: any[] = []
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  userObj: any = {
    id: null,
    name: '',
    username: '',
    email: '',
    company: {
      name: ''
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.get()
  }
  addUser() {
    const newUser = {
      ...this.userObj,
      id: Math.floor(Math.random() * 10000) // fake id
    };

    this.apiService.saveData(newUser).subscribe((res: any) => {
      this.ELEMENT_DATA.unshift(newUser);
      this.dataSource.data = this.ELEMENT_DATA;
      this.resetForm();
      this.apiService.showSuccess('User added successfully')
    }, (error: any) => {
      this.apiService.handleError('Failed to add user')
    });
  }


  editUser(row: any) {
    setTimeout(() => {
      this.userObj = JSON.parse(JSON.stringify(row));
    });
  }

  updateUser() {
    this.apiService.updateData(this.userObj.id, this.userObj).subscribe((res: any) => {
      const index = this.ELEMENT_DATA.findIndex(
        u => u.id === this.userObj.id
      );

      if (index !== -1) {
        this.ELEMENT_DATA[index] = { ...this.userObj };
        this.dataSource.data = [...this.ELEMENT_DATA];
      }

      this.resetForm();
      this.apiService.showSuccess('User updated successfully')
    }, (error: any) => {
      this.apiService.handleError('Failed to update user')
    });
  }


  deleteUser(id: number) {
    this.apiService.deleteData(id).subscribe((res: any) => {
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(u => u.id !== id);
      this.dataSource.data = this.ELEMENT_DATA;
      this.apiService.showSuccess('User deleted successfully')
    }, (error: any) => {
      this.apiService.handleError('Failed to delete user')
    });
  }


  resetForm() {
    this.userObj = {
      id: null,
      name: '',
      username: '',
      email: '',
      company: { name: '' }
    };
  }

  get() {
    this.apiService.getData().subscribe({
      next: (res: any) => {
        this.ELEMENT_DATA = res
        this.dataSource.data = this.ELEMENT_DATA
      }, error: (err: any) => {
        this.apiService.handleError('failed to get user')
      }
    })
  }
}
