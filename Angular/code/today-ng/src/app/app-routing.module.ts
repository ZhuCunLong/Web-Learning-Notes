import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SetupComponent} from './pages/setup/setup.component';

const routes: Routes = [
  { path: 'setup', component: SetupComponent },
  { path: 'main', redirectTo: '/main', pathMatch: 'full' },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
