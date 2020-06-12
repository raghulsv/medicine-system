import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class medicine {
  id?:number;
  medicine_name: string;
  description: string;
  manufacture_date: string;
  price: number;
  brand: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public clientsData : string;
  
  ngOnInit() {
    this.data='Submit';
    this.Posting();
  }
  private servUrl = "http://[::1]:3000/medicine-details";
  data;
  activeindex = -1;
  constructor(private http: HttpClient) {

  }
  ItemsArray = [];
  med: medicine = new medicine();

  onSubmit(form:NgForm):void{
    if(this.data=='Submit') {
      console.log(form.value);
      console.log(this.med.medicine_name);
      this.http.post<any>('http://[::1]:3000/medicine-details', {
        medicine_name: this.med.medicine_name,
        description: this.med.description,
        manufacture_date: this.med.manufacture_date,
        price: this.med.price,
        brand: this.med.brand,
      })
      .subscribe(data => {
        this.Posting();
      })
    }
    else
  {
    this.update();
  }
  }
  update()
  {
    console.log(this.activeindex);

    this.http.patch<any>('http://[::1]:3000/medicine-details/'+this.activeindex, {
      
      id:this.activeindex,
      medicine_name: this.med.medicine_name,
      description: this.med.description,
      manufacture_date: this.med.manufacture_date,
      price: this.med.price,
      brand: this.med.brand,
    })
    .subscribe(data => {
     
      this.Posting();
    })
  }
  edit(obj) {
    console.log(obj);
    this.data = 'Update';
    this.med.medicine_name = obj.medicine_name;
    this.med.description = obj.description;
    this.med.manufacture_date = obj.manufacture_date;
    this.med.price = obj.price;
    this.med.brand = obj.brand;
    this.activeindex = obj.id;
  }

  Posting() {
    return this.http.get<any>(this.servUrl) 
    .subscribe((res : any[]) => {
      this.ItemsArray = res;
    })

  }

}