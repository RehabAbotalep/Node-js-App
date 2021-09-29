import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _service:GlobalService, private _router:Router) { }

  ngOnInit(): void {
  }
  user={
    name:"",
    email:"",
    password:""
  }
  errorMsg:String = ""
  
  
  handleLogin(data:any){
    if(data.valid){
      this._service.login(this.user).subscribe(data=>{
        localStorage.setItem('authToken', `Bearer ${data.data.token}`)
      },(e)=>{this.errorMsg = e.error.data}, ()=>{
        this._service.navMenu = this._service.logedInRoutes
        this._router.navigate(['profile'])
      })
    }
    //console.log(this.user)
    
  }

}
