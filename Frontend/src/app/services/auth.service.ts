import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken : any;
  user : any;

  constructor(private http:HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
    .pipe(map((res:any) => res))
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
    .pipe(map((res:any) => res))
  }

  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
    .pipe(map((res:any) => res))
  }

  uploadFile(file){
    var formdata = new FormData()
    formdata.append('username',file.username);
    formdata.append('upload',file.filedata);
    return this.http.put('http://localhost:8080/users/upload', formdata)
    .pipe(map((res:any) => res))
  }


  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    if(this.authToken != null){return true;}
    else{return false;}
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
