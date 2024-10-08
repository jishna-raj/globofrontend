import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allProducts:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getWishlist()
  }


  getWishlist(){

    this.api.getItemWishlistApi().subscribe({
      next:(res:any)=>{
        console.log(res);

        this.allProducts=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }




  removeItem(id:any){
    this.api.removeWishlistItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.api.getWishlistCount()
        /* alert('deleted successfully') */
        this.getWishlist()
      },
      error:(err:any)=>{
        console.log(err);
        alert('something went wrong')    
      }  
    })

  }



  addToCart(product:any){

    if(sessionStorage.getItem("token")){
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('product added successfully')
          this.api.getCartCount()
          this.removeItem(product._id)
        },
        error:(err:any)=>{
          if(err.status == 406){
            alert(err.error)
            this.removeItem(product._id)
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
