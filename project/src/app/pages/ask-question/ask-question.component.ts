import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  constructor(private _service:GlobalService, private _router:Router) { }

  askForm = new FormGroup({
    "title" : new FormControl("", [Validators.required]),
    "description": new FormControl("", [Validators.required, Validators.minLength(50)]),
    "tags" : new FormControl([], [Validators.required])
  })
  get title() {return this.askForm.get('title')}
  get description() {return this.askForm.get('description')}
  get tags() {return this.askForm.get('tags')}

  ngOnInit(): void {
    let authToken = localStorage.getItem('authToken')
    if (!authToken) this._router.navigate(['/sign-in'])
    this.getTags()
  
  }
  allTags:any[]=[]
  getTags(){
    this._service.tags().subscribe(result=>{
      this.allTags = result.data
    })
  }

  askQuestion(){
    this._service.addQuestion(this.askForm.value).subscribe(result=>{
      console.log(result)
    },
    ()=>{
      this._router.navigate(['/sign-in'])
    },
    ()=>{
      this._router.navigate([''])
    }
    )}

}
