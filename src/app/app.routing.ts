import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { UserResolverService } from './services/user-resolver.service';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'new', component: LoginComponent, resolve: {
      users: UserResolverService
    }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }