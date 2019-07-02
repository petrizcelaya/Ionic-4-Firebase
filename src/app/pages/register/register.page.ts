import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:string;
  password:string;
  name:string;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  createUser(){
    this.authService.createUserEmail(this.email,this.password,this.name);
  }
}
