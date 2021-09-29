import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { HomeComponent } from './pages/home/home.component';
import { TagsComponent } from './pages/tags/tags.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthInterceptor } from './providers/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { SingleQuestionComponent } from './pages/single-question/single-question.component';
import { AccountActivationComponent } from './pages/account-activation/account-activation.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ForgetComponent } from './pages/password/forget/forget.component';
import { NewPasswordComponent } from './pages/password/new-password/new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestionsComponent,
    HomeComponent,
    TagsComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    AskQuestionComponent,
    SingleQuestionComponent,
    AccountActivationComponent,
    EditProfileComponent,
    ForgetComponent,
    NewPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    CKEditorModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
