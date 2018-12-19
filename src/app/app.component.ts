import { Component } from '@angular/core';
import { Auth0ServiceService } from './auth0-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth0';

  constructor(private loginService: Auth0ServiceService){

  }
  
  logMeIn(){
    this.loginService.login();
  }
}
