import { Component, OnInit, inject } from '@angular/core';
import { Auth, authState, getAuth, signInWithPhoneNumber } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import * as Auths from 'firebase/auth';
import { PlacesService } from 'src/app/services/places.service';



@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.css']
})
export class LoginPhoneComponent implements OnInit {

  isVerifyEnter: boolean = false;
  phoneNumber: FormGroup;
  verifyEnter: FormGroup;
  isPhoneSignIn: boolean = false;
  recaptchaVerifier!: any;
  user$!: Observable<any>;

  constructor(
    private auth: Auth,
    private userService: UserService,
    private router: Router,
    private placesService: PlacesService
  ) {
    this.phoneNumber = new FormGroup({
      phoneNumber: new FormControl(),
      name: new FormControl()
    })
    this.verifyEnter = new FormGroup({
      verifyEnter: new FormControl()
    })
  }

  get userState$(){
    return authState(this.auth);
  }

  ngOnInit(): void {
    this.auth = getAuth();
    this.auth.languageCode = 'es';
    this.user$ = this.userState$;
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.verifyRecaptcha();
  }

  onSubmit() {
    const auth = getAuth();
    const {phoneNumber} = this.phoneNumber.value;
    signInWithPhoneNumber(auth, phoneNumber, this.recaptchaVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          //window.confirmationResult = confirmationResult;
         // this.isVerifyEnter = true;
          var code = window.prompt('Enter the verification code you received by SMS');
          if (code) {
            confirmationResult.confirm(code).then( () => {
              window.close();
              this.newPlace();
              this.router.navigate(['/main']);
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              console.error('Error while checking the verification code', error);
              window.alert('Error while checking the verification code:\n\n'
                  + error.code + '\n\n' + error.message)
            });
          }
          console.log(confirmationResult)
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("Error", error)
        });
  }

  async newPlace(){
    console.log("llama pa");
    console.log(this.phoneNumber.value)
    const response = await this.placesService.addPlace2(this.phoneNumber.value);
    console.log(response);
  }

  onVerifyEnter(){
    /*const auth = getAuth();
    const {verifyEnter} = this.verifyEnter.value;
    if (verifyEnter){
      confirmationResult.confirm(verifyEnter).then((result) => {
        // User signed in successfully.
        const user = result.user;
        this.router.navigate(['/main']);
        // ...
      
          //@ts-ignore
      }).catch((error) => {
        console.log("Error papu")
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }*/
  
  }

  verifyRecaptcha = () => {
    /*const app = initializeApp(environment.firebase);
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6LcLB0cmAAAAANbLSlG_hFqRtS1lyYQvhYlptj1E'),
    
      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true
    });
    const auth = getAuth(app);
    auth.settings.appVerificationDisabledForTesting = false;
    auth.languageCode = 'en';    

    let recaptchaVerifier = new RecaptchaVerifier('phoneCaptcha', {}, auth)

    console.log(recaptchaVerifier)*/

    this.recaptchaVerifier = new Auths.RecaptchaVerifier('phoneCaptcha', {}, this.auth);
    console.log(this.recaptchaVerifier);

  }

  

}
