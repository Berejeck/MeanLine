import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/user/sign-in/sign-in.component';
import { SignUpComponent } from './pages/user/sign-up/sign-up.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { AboutComponent } from './pages/struct/about/about.component';
import { ContactComponent } from './pages/struct/contact/contact.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'about', component: AboutComponent },
  {path: 'contact', component: ContactComponent },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
