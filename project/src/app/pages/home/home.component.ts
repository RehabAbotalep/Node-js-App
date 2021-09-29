import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements OnInit {

  constructor(private _service:GlobalService, private _router: Router) { }

  questions:any[]=[]
  result:any=this.questions

  ngOnInit(): void {
    this.getQuestions()

  }
  getQuestions(){
    this._service.allQuestions().subscribe(result=>{
      this.result = result.data

    })
  }

  upVote(id:any, i:any){
    this._service.upVote(id).subscribe(result=>{
        console.log(result)
    },
    ()=>{

    }, ()=>{this.result[i].votes.length+=1})
    
  }

  downVote(id:any, i:any){
    this._service.downVote(id).subscribe(result=>{
        console.log(result)
    },
    ()=>{

    },()=>{this.result[i].votes.length-=1})
    
  }
  
}
