import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompartirUsuarioService {
  private correoElectronico=new BehaviorSubject<string>('');;
  correoElectronicoActual= this.correoElectronico.asObservable();
  actualizarDato(correoActual: string, contraActual:string){
    this.correoElectronico.next(correoActual);
  }
  constructor() { }
}
