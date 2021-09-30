import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private _service:GlobalService, private _router:Router) { }
  userData:any
  message:String = ""
  file:any

  editProfileForm = new FormGroup({
    "title" : new FormControl(""),
    "location" : new FormControl(""),
    "aboutMe": new FormControl(""),
    "github" : new FormControl(""),
    "twitter" : new FormControl(""),
  })
  get title() {return this.editProfileForm.get('title')}
  get location() {return this.editProfileForm.get('location')}
  get aboutMe() {return this.editProfileForm.get('description')}
  get github() {return this.editProfileForm.get('tags')}
  get twitter() {return this.editProfileForm.get('tags')}

  ngOnInit(): void {
    this.user()
  }
  editProfile(){
    this._service.updateProfile(this.editProfileForm.value).subscribe(result=>{
      this.userData = result.data

    },()=>{}, ()=>{this.message = "Updated Successfully"})
  }

  user(){
    this._service.profile().subscribe(result=>{
      this.userData = result.data
      
    })

  }

  onChangeFile(event:any){
    this.file=event.target.files[0]
  }

  upload(){
    this._service.uploadImage(this.file).subscribe(result=>{
      this.userData = result.data

    }, ()=>{}, ()=>{})
  }


}
