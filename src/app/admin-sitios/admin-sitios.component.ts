import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sitios',
  templateUrl: './admin-sitios.component.html',
  styleUrls: ['./admin-sitios.component.css']
})
export class AdminSitiosComponent {

  showForm: boolean = false;
  buttonText: string = 'Añadir Sitio';

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.buttonText === 'Añadir Sitio') {
      this.buttonText = 'Ocultar Formulario';
    } else {
      this.buttonText = 'Añadir Sitio';
    }
  }

}
