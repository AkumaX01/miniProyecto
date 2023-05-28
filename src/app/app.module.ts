import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';


import {YouTubePlayerModule} from '@angular/youtube-player'; //Aqui esta el api
import { RouterModule, Routes } from '@angular/router';
import { PaginaCasaComponent } from './pagina-casa/pagina-casa.component';
import { RegistroCitaComponent } from './registro-cita/registro-cita.component';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MostrarCitaComponent } from './mostrar-cita/mostrar-cita.component';
import { FormularioComponent } from './formulario/formulario.component';

//Las rutas simples
const appRoutes:Routes=[
  {path:'quienes', component:BodyComponent},
  {path:'casas', component:PaginaCasaComponent},
  {path:'cita', component:RegistroCitaComponent},
  {path:'tabla', component:MostrarCitaComponent},
  {path:'formulario', component:FormularioComponent}

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
    FormularioComponent
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
    MessagesModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
