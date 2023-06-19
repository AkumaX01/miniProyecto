import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Place from 'src/app/interface/place';
import { PlacesService } from 'src/app/services/places.service';


@Component({
  selector: 'app-pagina-casa',
  templateUrl: './pagina-casa.component.html',
  styleUrls: ['./pagina-casa.component.css']
})
export class PaginaCasaComponent {

  @Output() argumentoEnviado = new EventEmitter<string>();
  places: Place[];

  constructor(
    private placesService: PlacesService,
    private router: Router
  ) {
    this.places = [{
      id: " ",
      nombre: " ",
      fecha: new Date(),
      hora: " ",
      aire: "true",
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      reserva: ["asd","asda"]
    }];
  }

  enviarArgumento(valor: string) {
    this.argumentoEnviado.emit(valor);
  }

  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      this.places = places;
    })
  }

  redirectToPage(parametro) {

    this.router.navigate(['/reserva'], { queryParams: { parametro: parametro } });
  
  }
}
