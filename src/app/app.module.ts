import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';


import {YouTubePlayerModule} from '@angular/youtube-player';
import { RouterModule, Routes } from '@angular/router';
import { PaginaCasaComponent } from './pagina-casa/pagina-casa.component';
import { RegistroCitaComponent } from './registro-cita/registro-cita.component';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MostrarCitaComponent } from './mostrar-cita/mostrar-cita.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { LoginPhoneComponent } from './login-phone/login-phone.component';
import { RegisterComponent } from './register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { QrgenerateComponent } from './qrgenerate/qrgenerate.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ScreenReaderComponent } from './screen-reader/screen-reader.component';
import { HttpClientModule } from '@angular/common/http';
import { DomseguroPipe } from './domseguro.pipe';

//Las rutas simples
const appRoutes:Routes=[
  {path:'quienes', component:BodyComponent},
  {path:'casas', component:PaginaCasaComponent},
  {path:'cita', component:RegistroCitaComponent},
  {path:'tabla', component:MostrarCitaComponent},
  {path:'formulario', component:FormularioComponent},
  {path:'login', component: LoginComponent},
  {path:'login-phone', component: LoginPhoneComponent},
  {path:'register', component: RegisterComponent},
  {path:'qr', component: QrgenerateComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    BodyComponent,
    PaginaCasaComponent,
    RegistroCitaComponent,
    MostrarCitaComponent,
    FormularioComponent,
    LoginComponent,
    LoginPhoneComponent,
    RegisterComponent,
    QrgenerateComponent,
    ScreenReaderComponent,
    DomseguroPipe,
    GraficasComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    CalendarModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CascadeSelectModule,
    DropdownModule,
    RatingModule,
    CardModule,
    HttpClientModule,
    MessagesModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
