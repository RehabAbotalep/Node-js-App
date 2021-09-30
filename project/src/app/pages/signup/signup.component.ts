import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _service:GlobalService, private _router: Router) { }

  ngOnInit(): void {
  }
  user={
    name:"",
    email:"",
    password:""
  }
  errorMsg:string = ""
  
  handleRegister(data:any){
    if(data.valid){
      this._service.register(this.user).subscribe(data=>{
      }, (e)=>{this.errorMsg = "This email is already exists"}, ()=>{
        this._router.navigateByUrl('/sign-in')
      })
    }
    
  }

}
