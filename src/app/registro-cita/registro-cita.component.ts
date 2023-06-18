import { Component,EventEmitter,Output,OnInit,Input} from '@angular/core';
import { Message } from 'primeng/api';
import { Auth, authState, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';  
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css']
})
export class RegistroCitaComponent implements OnInit{
  @Output() cambio=new EventEmitter<String[]>(); /////uso de output
  

  variable: string = "";
  fechaObtenida='';
  messages: Message[];
  messages2: Message[];
  messages3: Message[];

  user$!: Observable<any>;
  banderaLogeado=false;
  email="";

  argumentoRecibido: string = "";

  recibirArgumento(valor: string) {
    this.argumentoRecibido = valor;
  }

  

    addMessages() {
        this.messages = [
            { severity: 'success', summary: 'Reservado:', detail: 'El registro ha sido exitoso' },
        ];
        // Obtén los valores del formulario
  const asunto = 'Reservación de casa';
  const correo = 'neroxpilgrim@gmail.com'; // Reemplaza con la dirección de correo a la que se enviará el mensaje
  const descripcion = `Fecha: ${this.auxF}, Hora: ${this.horaSeleccionada}`;

  // Envía el correo al servidor Node.js
  this.enviarCorreo(asunto, correo, descripcion);
    }
    addMessages2() {
      if(this.calificacion<=3){
        this.messages3=[
          { severity: 'info', summary: 'Lamentamos', detail: 'Esperamos que tu proxima experiencia sea mejor' },
        ]
      }else{
        this.messages3 = [
          { severity: 'success', summary: 'Gracias!!!', detail: 'Nos alegra saber que te gusto' },
        ];
      }
      
  }
    

   

    
  public date:Date =new Date();
  public auxF:Date=new Date;
  hora: string[]=['12:00','14:00','15:00'];
  horaSeleccionada: string='';
  p: string='';
  bandera: boolean=false;
  
  dia: number=0;
  mes: number=0;
  anio: number=0;
  calificacion: number=0;

  minimumDate = new Date();
  public fechaArray: Date[]=[];// guarda las fechas del localstorage
  public horaLocal: String[]=[]; //guarda los horarios del localStorage
  public horaLocal2: String[]=[]; //guarda los horarios del localStorage

  public fechaArray2: String[]=[];

  public horario: string[]=[];
  constructor(private http: HttpClient, private auth: Auth,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute){
    this.messages = [];
    this.messages2 = [];
    this.messages3 = [];

    


    this.cambio.emit(this.fechaArray2);

    if (!(localStorage.getItem("fecha") === null && localStorage.getItem("hora") === null)) { //vemos si localStorage esta vacio
        this.fechaArray2= JSON.parse(localStorage.getItem('fecha')!);
      this.horaLocal2= JSON.parse(localStorage.getItem('hora')!);

      for (let i = 0; i < this.fechaArray2.length; i++) {
        this.fechaArray.push(new Date(String(this.fechaArray2[i])));
        this.horaLocal.push(String(this.horaLocal2[i]))
      }
      console.log(this.fechaArray);
    }
    
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
  
  


  agregarDatosReservacion(){// Se agregan los datos al localStorage
    this.fechaArray.push(this.date);// se agrega al array con todas las fechas
    this.horaLocal.push(this.horaSeleccionada);//se agrega al array con todas las horas
    localStorage.setItem("fecha", JSON.stringify(this.fechaArray));//se envia la fecha al localStorage
    localStorage.setItem("hora",JSON.stringify(this.horaLocal));
  }
  

  getValue(val: any){
    console.warn(val);
  }

  value : any;

 comprobarFecha(){ // Funcion de busqueda
    this.bandera=false;
    let toArray =  this.fechaObtenida.split(",");
    this.auxF= new Date(this.fechaObtenida);
    
    for (let i = 0; i < this.fechaArray.length; i++) {
      //if(this.fechaArray[i].getFullYear===this.auxF.getFullYear && this.fechaArray[i].getDay===this.auxF.getDay && this.fechaArray[i].getMonth===this.auxF.getMonth){
      //this.anio=this.fechaArray[i].getFullYear;
      if(this.fechaArray[i].getFullYear()===this.auxF.getFullYear() && this.fechaArray[i].getDay()===this.auxF.getDay() && this.fechaArray[i].getMonth()===this.auxF.getMonth()){
          this.bandera=true;
          
      }
      /*console.log(this.fechaArray[i].getFullYear());
      console.log(this.fechaArray[i].getDay());
      console.log(this.fechaArray[i].getMonth());
      console.log("_________________");
      console.log(this.auxF.getFullYear());
      console.log(this.auxF.getDay());
      console.log(this.auxF.getMonth());*/
      
    }
    if(this.bandera===false){
      this.messages2 = [
        
        { severity: 'success', summary: '', detail: 'Se encuentran fechas disponibles' },
        
     ];

    }else{
      this.messages2 = [
        { severity: 'warn', summary: 'Waning', detail: 'Fecha se encuentra ocupada' },
        
    ];
    }
 }
    get userState$(){
      return authState(this.auth);
    }

    parametro: string = "";
    ngOnInit(): void {
      
      this.auth = getAuth();
      this.user$ = this.userState$;
      this.user$.subscribe(user => {
        if (user) {
          
          this.email = user.email;
          if(this.email!=""){
            this.banderaLogeado=true;
          }
          
          //console.log('Email:', email);
        }
      });
    }
  
  
}

