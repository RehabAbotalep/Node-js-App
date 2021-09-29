import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags:any[]=[]

  constructor(private _service:GlobalService) { }

  ngOnInit(): void {
    this.allTags()
  }

  allTags(){
    this._service.tags().subscribe(result=>{
      this.tags = result.data

    })
  }

}
