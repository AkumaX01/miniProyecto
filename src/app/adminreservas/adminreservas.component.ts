import { Component } from '@angular/core';
import Place from 'src/app/interface/place3';
import { PlacesService } from 'src/app/services/places.service';
import Place2 from '../interface/place2';
import { Auth, authState, getAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminreservas',
  templateUrl: './adminreservas.component.html',
  styleUrls: ['./adminreservas.component.css']
})
export class AdminreservasComponent {
  places: Place[];
  email="";

  user$!: Observable<any>;
  constructor(
    private placesService: PlacesService,
    private auth: Auth,
    private userService: UserService,
  ) {
    this.places = [{
      nombre: " ",
      fecha: "new Date()",
      hora: " ",
      aire: "true",
      cuartos: 4,
      categoria: "Depa",
      imagen: " ",
      email: ""
    }];
  }


  get userState$(){
    return authState(this.auth);
  }


  ngOnInit(): void {


    this.auth = getAuth();
    this.user$ = this.userState$;
    this.user$.subscribe(user => {
      if (user) {
        
        this.email = user.email;
        console.log(this.email);
        //console.log('Email:', email);
      }
      
    });
    this.placesService.getPlaces3().subscribe(places => {
      this.places = places;
      console.log("Email"+this.email)
    })
    
  }

  async onClickDelete(place: Place) {
    const response = await this.placesService.deletePlace3(place);
    console.log(response);
  }


}
