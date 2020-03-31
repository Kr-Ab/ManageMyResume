import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : String;
  username : String;
  email : String;
  password : String;

  constructor(private validateService: ValidateService, 
              private flashMessage:FlashMessagesService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name : this.name,
      email : this.email,
      username : this.username,
      password : this.password
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill all the fields", {cssClass: 'alert-danger', timeout : 1000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please enter correct email ID", {cssClass: 'alert-danger', timeout : 1000})
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.Success){
        this.flashMessage.show("User Registered", {cssClass: 'alert-success', timeout : 1000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show("User Exists", {cssClass: 'alert-danger', timeout : 1000});
        this.router.navigate(['/register']);
      }
    });
  }

}
