import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
item=
{name: '',
email : '',
username:'',
password : '',
confirmPassword : '',
}
  constructor(private http:HttpClient) { }
  getSignup(id:any){
    return this.http.get("http://localhost:3000/signup/"+id);
  }
  getSignups(){
    return this.http.get("http://localhost:3000/signups");
  }

  newSignup(item:any)
  {   
    return this.http.post("http://localhost:3000/insertsignup",{"signup":item})
    .subscribe(data =>{console.log(data)})
  }
}
