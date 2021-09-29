import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _service:GlobalService, private _router:Router) { }


  ngOnInit(): void {
  }
  logout(){
    this._service.logout().subscribe(result => {

    },()=>{}, ()=>{
      localStorage.removeItem('authToken')
      this._service.isLoggedIn = false
      this._service.navMenu = this._service.globalRoutes
      this._router.navigateByUrl('/')
    })
  }

}
