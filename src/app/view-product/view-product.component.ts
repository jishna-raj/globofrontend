import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})



export class ViewProductComponent implements OnInit {

  product:any = []


  constructor(private api:ApiService , private route:ActivatedRoute , private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);

      const {id} = res
      this.getAProduct(id)
      
    })
  }

  getAProduct(id:any){
    this.api.getAProductApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.product = res
        
      },error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  addItemToWishlist(){

    if(sessionStorage.getItem("token")){
      this.api.addItemToWishlistApi(this.product).subscribe({
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
      alert("please login")
      this.router.navigateByUrl('/login')
    }
  }


  addToCart(){

    if(sessionStorage.getItem("token")){
      this.api.addToCartApi(this.product).subscribe({
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
