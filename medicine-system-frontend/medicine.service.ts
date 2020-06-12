import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { medicine } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private url:string ="http://[::1]:3000/medicine-details";

 constructor(private http:HttpClient) { }
 
   Create(med:medicine):Observable<medicine>
   {
     return this.http.post<medicine>(this.url,med);
   }
   Getall():Observable<medicine[]>
   {
     return this.http.get<medicine[]>(this.url);
   }
 }