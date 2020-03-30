import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : any;
  resume : any;
  constructor(private authService : AuthService,
              private flashMessage:FlashMessagesService,
              private router : Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.resume = profile.user.resume;
      if(this.resume != null){
        let view = <HTMLObjectElement>document.getElementById("resumeview");
        view.setAttribute('src', "data:application/pdf;base64," + this.user.resume.data);
      }
    },
    err => {
      console.log(err);
      return false;
    })
  }
}

