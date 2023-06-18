import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  contactanos:any;
  mensaje:string="";
  palabrasOB:string[]=["gay","tonto","feo","puto"];
  constructor(private formBuilder: FormBuilder) { 
    this.messages = [];
  }

  messages: Message[];

  addMessages() {
      this.messages = [
          { severity: 'success', summary: 'Enviado:', detail: 'Gracias por tu comentario, lo tomaremos en cuenta' },
      ];
  }

  ngOnInit(): void {
    this.contactanos = new FormGroup({
      fname: new FormControl('',[Validators.required,Validators.minLength(4)]),
      lname: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]),
      phone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      message: new FormControl('',[Validators.required,this.palabrasOb(this.mensaje)])
    });
  }
  submit() {
    if (this.contactanos.valid) {
      console.log(this.contactanos.value)
      this.addMessages();
    }
    else{
      alert("Llena todos los campos")
    }
  }
  palabrasOb(limit: string) {
    return (control: AbstractControl) => {
      let palabras=control.value.split(' ');
      console.log(palabras);
      let band: Boolean = false;
      
      for (let i = 0; i <= this.palabrasOB.length; i++) {
        if (control.value.includes(this.palabrasOB[i])) {
          band = false;
          break;
        } else {
          band = true;
        }
      }
      if (band == true) {
        console.log("no hay palabras malas")
        console.log("Palabra Utilizada" + control.value);

        return null;

      } else  {
        console.log("Cuida tu vocabulario");
        
      }//si pasa aca se muestra el mensaje
        return { palabrasOb: true
      }

    }

  }
}
