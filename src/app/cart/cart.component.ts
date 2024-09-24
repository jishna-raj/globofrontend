import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProduct:any = []

constructor(private api:ApiService){}

ngOnInit(): void {
  this.getCartItem()
}


getCartItem(){
  this.api.getCartItemApi().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.allProduct=res
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}


removeCartItem(id:any){
  this.api.removeCartItemApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.api.getCartCount()
      /* alert('deleted successfully') */
       this.getCartItem() 
    },
    error:(err:any)=>{
      console.log(err);
      alert('something went wrong')    
    }  
  })

}



emptyCart(){
  this.api.emptyCartApi().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getCartItem()
      this.api.getCartCount()
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}


}
