import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

  constructor(private _service:GlobalService,private _router:ActivatedRoute, private _navigator:Router) { }

  ngOnInit(): void {
    const token = this._router.snapshot.queryParamMap.get('token')
    this.activeAccount(token)
  }

  activeAccount(token:any){
    this._service.verify(token).subscribe(result=>{

    },
    ()=>{},()=>{this._navigator.navigate(['/sign-in'])})
  }





}
