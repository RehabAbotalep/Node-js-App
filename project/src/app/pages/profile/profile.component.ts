import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  

  constructor(private _service:GlobalService) { }

  ngOnInit(): void {
    this.userProfile()
  }
  user:any
  about:boolean = false
  askedQuestions:any
  answeredQuestions:any
 
  userProfile(){
    this._service.profile().subscribe(result=>{
      this.user = result.data.user
      this.askedQuestions = result.data.askedQuestions
      this.answeredQuestions = result.data.answeredQuestions

      if(this.user.aboutMe != null) this.about = true

    },()=>{}, ()=>{
      
    })
  }
}
