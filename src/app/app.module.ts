import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  imports:      [ BrowserModule, FormsModule ,AppRoutingModule, CommonModule, ReactiveFormsModule ],
  declarations: [ AppComponent, LoginComponent, RegistrationComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UserService, provideHttpClient()]
})
export class AppModule { }
