import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StaffServicesService } from 'src/app/Services/staff-services.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit{
  orderList:any;
  error:any;
  result:any
  res:any
  id:any
  // dropdown:any;
  constructor(private http:HttpClient, private staff:StaffServicesService,private router:Router) { }

  ngOnInit(): void {
    this.staff.getOrders().subscribe((data)=>{
      this.orderList = data
      console.log(this.orderList);
    }, (err)=>{
      this.error = err;
      console.log(this.error);
    })
  }

  // dropdownchange(){
  //   console.log("change function", this.dropdown);
    
  // }
  deleteProduct(id:any){
    

    this.staff.deleteData(id).subscribe((res:any)=>{
      console.log(res);
      
      this.staff.deleteData(id).subscribe((res)=>{
        this.result=res;
      })
      this.router.navigate(['/listorders'])  
    },(err)=>{
      console.log(err);
      
    })
  }
  

}
