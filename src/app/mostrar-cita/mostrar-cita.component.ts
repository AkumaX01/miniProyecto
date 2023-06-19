import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import Place from 'src/app/interface/place';
import { PlacesService } from 'src/app/services/places.service';
  
@Component({
  selector: 'app-mostrar-cita',
  templateUrl: './mostrar-cita.component.html',
  styleUrls: ['./mostrar-cita.component.css']
})
export class MostrarCitaComponent {
  places: Place[];

  constructor(
    private placesService: PlacesService
  ) {
    this.places = [{
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

  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      this.places = places;
    })
  }
  public hoverStyle = {
    // Estilo cuando se aplica el efecto hover
    background: 'red',
    color: 'white'
  };

}
