import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Place from 'src/app/interface/place';
import { PlacesService } from 'src/app/services/places.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Auth, authState, getAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  places: Place;
  parametro: string = "";
  date: any;
  minimumDate: Date = new Date();
  arrayDeFechas: Date[];
  email="";

  user$!: Observable<any>;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private http: HttpClient,
    private auth: Auth,
    private userService: UserService,
    private router: Router
  ) {
    this.places = {
      nombre: " ",
      fecha: new Date(),
      hora: " ",
      aire: "true",
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      reserva: ["asd","asda"]
    };
  }
  get userState$(){
    return authState(this.auth);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parametro = params['parametro'];
    });
    this.placesService.getPlaceById(this.parametro).subscribe(places => {
      console.log(places);
      this.places = places;
      console.log(places.reserva);
      const arrayDeTexto: string[] = places.reserva;

      const arrayDeFechas: Date[] = arrayDeTexto.map((texto: string) => new Date(texto));
      this.arrayDeFechas = arrayDeFechas;
      for (let i = 0; i < arrayDeFechas.length; i++) {
        const fechaActual = arrayDeFechas[i];
        fechaActual.setDate(fechaActual.getDate() + 1);
      }

      //this.places.reserva: Date[] = places.reserva.map((texto: string) => new Date(texto));
      
      console.log(arrayDeFechas)
    })


    this.auth = getAuth();
    this.user$ = this.userState$;
    this.user$.subscribe(user => {
      if (user) {
        
        this.email = user.email;
        
        //console.log('Email:', email);
      }
    });
  }

  update(): void{
    const fechaFormateada = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    this.placesService.editDoc(this.parametro, fechaFormateada);

    const descripcion = "Usted ha reservado en nuestra pagina en el sitio "+this.places.nombre+" en la fecha "+fechaFormateada;

    this.enviarCorreo("Nueva Reservacion", this.email, descripcion)
  }


  enviarCorreo(asunto: string, correo: string, descripcion: string) {
    const url = 'http://localhost:3000/enviar-correo'; 
  
    const data = {
      asunto: asunto,
      correo: correo,
      descripcion: descripcion
    };
  
    this.http.post(url, data).subscribe(
      (response) => {
        console.log('Correo enviado correctamente');
      },
      (error) => {
        console.log('Error al enviar el correo:', error);
      }
    );
  }
}
