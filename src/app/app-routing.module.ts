import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LeadPageComponent } from './lead-page/lead-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: LeadListComponent },
  { path: 'leadHome', component: LeadPageComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
