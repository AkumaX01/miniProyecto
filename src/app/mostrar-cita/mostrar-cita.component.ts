import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
  
@Component({
  selector: 'app-mostrar-cita',
  templateUrl: './mostrar-cita.component.html',
  styleUrls: ['./mostrar-cita.component.css']
})
export class MostrarCitaComponent {
  public fechaMostrar2: String[]=[];
  @Input() public fechaArray2: String[]=[]; //Uso de input

  funCambiar(event: String[]){ //RECIBE OUTPUTttt
   this.fechaMostrar=event; 

  }
  datos=1;

  fechaMostrar= JSON.parse(localStorage.getItem('fecha')!);

  horaLocal= JSON.parse(localStorage.getItem('hora')!);

  headers=["Fecha","Hora"];

  constructor(private route: ActivatedRoute){
    
  }

  
  
  Init(): void{
    this.route.paramMap.subscribe(params =>{
      const bandera= params.get('bandera');
    })
  }
  
    
  
  
}
