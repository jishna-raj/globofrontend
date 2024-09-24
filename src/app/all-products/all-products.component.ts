import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts : any=[]

  constructor (private api: ApiService){}

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.api.getAllProductsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProducts = res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }



  addItemToWishlist(product:any){

    if(sessionStorage.getItem("token")){
      this.api.addItemToWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWishlistCount()
          alert("product added successfully")
          
        },
        error:(err:any)=>{
          if(err.status==406){
            alert(err.error)
          }
        }
      })
    }

    else{
      alert("something went wrong")
    }
  }



  addToCart(product:any){

    if(sessionStorage.getItem("token")){
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('product added successfully')
          this.api.getCartCount()
          
        },
        error:(err:any)=>{
          if(err.status == 406){
            alert(err.error)
          }
          else{
            alert("something went wrong")
          }
        }
      })
    }

    else{
      alert("please login")
    }
  
  }

}
