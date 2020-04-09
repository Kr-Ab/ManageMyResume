import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : any;
  file : File;
  constructor(private authService : AuthService,
              private flashMessage:FlashMessagesService,
              private router : Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    })
  }

  onUploadSubmit(){
    let inputStream = <HTMLInputElement>document.getElementById("resume")
    let inputfile = inputStream.files[0];
    if(inputfile.size > 100000)
    {
      this.flashMessage.show("Failed To upload File. Please try again.", {cssClass: 'alert-danger', timeout : 1000});
      this.router.navigate(['/profile']);
    }
    else
    {
      this.authService.uploadFile({
        username : this.user.username,
        filedata : inputfile
      }).subscribe(data => {
        if(data.Success){
          this.flashMessage.show("File Uploaded", {cssClass: 'alert-success', timeout : 1000});
          this.router.navigate(['/dashboard']);
        }else{
          this.flashMessage.show("Failed To upload File. Please try again.", {cssClass: 'alert-danger', timeout : 3000});
          this.router.navigate(['/profile']);
        }
      });
    }
  }  


}
