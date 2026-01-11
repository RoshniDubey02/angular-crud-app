import { Routes } from '@angular/router';
import { User } from './user/user';

export const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: "user", component: User }
];
