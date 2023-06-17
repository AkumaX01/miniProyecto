import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private placesService: PlacesService
  ) {
    this.formReg = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.newPlace();
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  async newPlace() {
    console.log("llama pa");
    console.log(this.formReg.value)
    const response = await this.placesService.addPlace2(this.formReg.value);
    console.log(response);
  }
}
