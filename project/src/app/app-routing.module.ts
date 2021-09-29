import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AccountActivationComponent } from './pages/account-activation/account-activation.component';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetComponent } from './pages/password/forget/forget.component';
import { NewPasswordComponent } from './pages/password/new-password/new-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SingleQuestionComponent } from './pages/single-question/single-question.component';
import { TagsComponent } from './pages/tags/tags.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  {path :"", component:HomeComponent},
  {path:"sign-up", component:SignupComponent},
  {path:"active-account", component:AccountActivationComponent},
  {path:"sign-in", component:SigninComponent},
  {path:"profile", component:ProfileComponent},
  {path:"edit-profile", component:EditProfileComponent},
  {path:"forget-password", component:ForgetComponent},
  {path:"new-password", component:NewPasswordComponent},

  {path:"ask-question", component:AskQuestionComponent},
  {path:"tags", component:TagsComponent},
  {path:"questions/:id", component:SingleQuestionComponent},
  {path:"logout", component:NavbarComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
