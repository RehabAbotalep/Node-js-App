import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  public globalRoutes = [
    {path:"", key:"Questions"},
    {path:"/tags", key:"Tags"},
    {path:"/sign-up", key:"Sign-up"},
    {path:"/sign-in", key:"Sign-in"},
  ]
  public logedInRoutes=[
    {path:"", key:"Questions"},
    {path:"/tags", key:"Tags"},
    {path:"/profile", key:"Profile"},
    {path:"/logout", key:"LogOut"},
  ]
  public isLoggedIn = localStorage.getItem('authToken') ? true : false
  public navMenu = localStorage.getItem('authToken') ? this.logedInRoutes : this.globalRoutes

  constructor(private _http:HttpClient) { }

  baseUrl="http://localhost:3000/"

  register(data:any):Observable<any>{
    return this._http.post(`${this.baseUrl}user/register`, data)
  }

  login(data:any):Observable<any>{
    return this._http.post(`${this.baseUrl}user/login`, data)
  }

  logout():Observable<any>{
    return this._http.get(`${this.baseUrl}user/logout`)
  }

  verify(token:any):Observable<any>{
    return this._http.get(`${this.baseUrl}user/verify?token=${token}`)
  }

  profile():Observable<any>{
    return this._http.get(`${this.baseUrl}user/profile`)
  }

  updateProfile(data:any):Observable<any>{
    return this._http.patch(`${this.baseUrl}user/update`, data)
  }

  tags():Observable<any>{
    return this._http.get(`${this.baseUrl}tags`)
  }

  tagQuestions(id:any):Observable<any>{
    return this._http.get(`${this.baseUrl}tags/${id}/questions`)
  }

  addQuestion(data:any):Observable<any>{
    return this._http.post(`${this.baseUrl}questions`, data)
  }

  allQuestions():Observable<any>{
    return this._http.get(`${this.baseUrl}questions`)

  }
  
  upVote(id:any):Observable<any>{
    return this._http.put(`${this.baseUrl}questions/${id}/upVote`, null)
  }

  downVote(id:any):Observable<any>{
    return this._http.put(`${this.baseUrl}questions/${id}/downVote`, null)
  }

  singleQuestion(id:any):Observable<any>{
    return this._http.get(`${this.baseUrl}questions/${id}`)
  }

  submitAnswer(id:any, data:any):Observable<any>{
    return this._http.post(`${this.baseUrl}questions/${id}/answer`, data)
  }
}
