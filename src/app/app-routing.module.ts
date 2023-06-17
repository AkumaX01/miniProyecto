import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginPhoneComponent } from './login-phone/login-phone.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
