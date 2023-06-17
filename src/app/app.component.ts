import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';
  nombre:string="Hector";
  imagePath: string = 'assets/img/accesibilidadicono.png';


}
