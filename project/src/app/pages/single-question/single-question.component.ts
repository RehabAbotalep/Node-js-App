import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';


@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  answerForm = new FormGroup({
    "answer" : new FormControl("", [Validators.required]),
  })
  get answer() {return this.answerForm.get('answer')}
  question:any
  id:any
  defaultImageUrl:string='assets/img/default.jpg';

  constructor(private _service:GlobalService,private _route:ActivatedRoute, private _navigator:Router) { 
  }

  ngOnInit(): void {
    // this._route.queryParams.subscribe(params => {
    //   this.id = params["questionId"];
    //   this.getQuestion(this.id)
    // })
    this.id = this._route.snapshot.paramMap.get('id')
    this.getQuestion(this.id)
  }

  submitAnswer(){
    this._service.submitAnswer(this.id, this.answerForm.value).subscribe(result=>{
      this.question = result.data
      console.log(this.question)
    
    }, ()=>{this._navigator.navigateByUrl('/sign-in')}, ()=>{})
  }

  getQuestion(id:any){
    this._service.singleQuestion(id).subscribe(result=>{
      this.question = result.data
  })
  

  }

}
