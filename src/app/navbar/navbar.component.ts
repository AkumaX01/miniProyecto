import { Component, OnInit } from '@angular/core';
import { Auth, authState, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  banderaLogeado=false;
  banderaLogeadoAdmin=false;
  email="";

  user$!: Observable<any>;

  constructor(
    private auth: Auth,
    private userService: UserService,
    private router: Router
  ) { }


  get userState$(){
    return authState(this.auth);
  }

  ngOnInit(): void {
    this.auth = getAuth();
    this.user$ = this.userState$;
    this.user$.subscribe(user => {
      if (user) {
        
        this.email = user.email;
        if(this.email!=""){
          this.banderaLogeado=true;
        }
        if(this.email=="admin@admin.com"){
          this.banderaLogeadoAdmin=true;
        }
        
        //console.log('Email:', email);
      }
    });
  }
  onClickMe(){
    this.banderaLogeado=false;
    this.banderaLogeadoAdmin=false;
    this.userService.logout();
  }

}
