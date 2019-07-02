import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:string;
  private password:string;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  loginEmail(){
    console.log(this.email);
    this.authService.loginUserEmail(this.email,this.password);
  }
}
