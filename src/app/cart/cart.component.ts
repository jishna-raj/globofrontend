import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allProduct:any = []

  total:any = 0

constructor(private api:ApiService , private router:Router){}

ngOnInit(): void {
  this.getCartItem()
}


getCartItem(){
  this.api.getCartItemApi().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.allProduct=res
      this.getTotal()
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}


getTotal(){
 this.total = Math.ceil(this.allProduct.map((item:any)=>item.grandTotal).reduce((n1:any,n2:any)=>n1+n2))

 console.log(this.total);
 
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



//increment cartItem

increment(id:any){

  this.api.incrementApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getCartItem()
      this.api.getCartCount()
      
    },error:(err:any)=>{
      console.log(err);
      
    }
  })

}

//increment cartItem

decrement(id:any){

  this.api.decrementApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getCartItem()
      this.api.getCartCount()
      
    },error:(err:any)=>{
      console.log(err);
      
    }
  })

}



checkOut(){
  sessionStorage.setItem("total",JSON.stringify(this.total))
  this.router.navigateByUrl('/checkout')
  
}




}
