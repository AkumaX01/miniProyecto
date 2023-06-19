import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Place from 'src/app/interface/place';
import Place3 from 'src/app/interface/place3';
import { PlacesService } from 'src/app/services/places.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Auth, authState, getAuth } from '@angular/fire/auth';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent {
  places: Place;
  places2: Place3;
  parametro: string = "";
  date: any;
  minimumDate: Date = new Date();
  arrayDeFechas: Date[];
  email="";
  banderaLogeado=false;
  messages: Message[];
  user$!: Observable<any>;
  banderaMensaje=false;

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
    this.places2 = {
      nombre: " ",
      fecha: "",
      hora: " ",
      aire: "true",
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      email: ""
    };
  }
  get userState$(){
    return authState(this.auth);
  }

  addMessages() {
    this.messages = [
        { severity: 'success', summary: 'Reservado:', detail: 'El registro ha sido exitoso' },
    ];
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
        console.log(this.email);
    if (this.email==="") {
      this.banderaLogeado=false;
    }else {
      this.banderaLogeado=true;
    }
        //console.log('Email:', email);
      }
      
    });
  }

  async update(): Promise<void>{
    
    if(this.banderaLogeado==false){
      this.router.navigate(['/login']);
    }else{
      const fechaFormateada = this.datePipe.transform(this.date, 'yyyy-MM-dd');
      this.places2.fecha = String(fechaFormateada);

    this.placesService.editDoc(this.parametro, fechaFormateada);
    const fecha: Date = new Date();
    const hora: number = fecha.getHours();
    const minutos: number = fecha.getMinutes();

    this.places2.email = this.email;
    this.places2.nombre = this.places.nombre;
    this.places2.cuartos = this.places.cuartos;
    this.places2.categoria = this.places.categoria;
    this.places2.imagen = this.places.imagen;
    this.places2.hora = String(hora+":"+minutos);


    console.log(this.places2);

    this.placesService.addPlace3(this.places2);


    const descripcion = "Usted ha reservado en nuestra pagina en el sitio "+this.places.nombre+" en la fecha "+fechaFormateada;

    this.enviarCorreo("Nueva Reservacion", this.email, descripcion);
    this.addMessages();
    this.banderaMensaje=true;
    }

  }

  
  enviarCorreo(asunto: string, correo: string, descripcion: string) {
    const url = 'https://finalgina.fly.dev/enviar-correo'; 
  
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
