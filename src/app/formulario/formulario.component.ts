import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  contactanos:any;
  mensaje:string="";
  palabrasOB:string[]=["gay","tonto","feo","puto"];
  constructor(private formBuilder: FormBuilder,private http: HttpClient) { 
    this.messages = [];
  }

  messages: Message[];

  addMessages() {
      this.messages = [
          { severity: 'success', summary: 'Enviado:', detail: 'Gracias por tu comentario, lo tomaremos en cuenta' },
      ];
      const asunto = 'Contacto';
  const correo = "proyectoginaweb90@gmail.com"; // Reemplaza con la dirección de correo a la que se enviará el mensaje
  const descripcion = `Nombre: ${this.contactanos.get('fname').value}
  Apellido: ${this.contactanos.get('lname').value}
  Correo: ${this.contactanos.get('email').value}
  Telefono: ${this.contactanos.get('phone').value}
  Mensaje: ${this.contactanos.get('message').value}`;

  // Envía el correo al servidor Node.js
  this.enviarCorreo(asunto, correo, descripcion);
  Notiflix.Loading.remove();
  }

  enviarCorreo(asunto: string, correo: string, descripcion: string) {
    const url = 'https://finalgina.fly.dev/enviar-correo/contacto'; 
  
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
    Notiflix.Loading.circle("Mandando...");
    if (this.contactanos.valid) {
      console.log(this.contactanos.value)
      this.addMessages();
    }
    else{
      alert("Llena todos los campos")
    }
    const formData = this.contactanos.value;
  const firstName = formData.fname;
  const lastName = formData.lname;
  const email = formData.email;
  const phone = formData.phone;
  const message = formData.message;

  // Realiza las acciones necesarias con los datos del formulario

  // Limpia el formulario después de realizar las acciones
  this.contactanos.reset();
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

      } else  {
        console.log("Cuida tu vocabulario");

      }//si pasa aca se muestra el mensaje
        return { palabrasOb: true
      }

    }

  }
}
