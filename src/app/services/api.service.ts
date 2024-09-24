import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = 'http://localhost:4000'


  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http: HttpClient) {

    this.getWishlistCount()
   }


  //api to get all products

  getAllProductsApi() {

    return this.http.get(`${this.serverUrl}/all-product`)

  }


  //api to get a particular product

  getAProductApi(id: any) {
    return this.http.get(`${this.serverUrl}/view-product/${id}`)
  }


  //api to register a user

  registerApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/register`, reqBody)
  }


  //login api

  loginApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/login`, reqBody)

  }


  addTokenToHeader() {
    //httpHeaders() - to add headers to a http request

    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")

    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }

    return { headers }
  }

  addItemToWishlistApi(reqBody: any) {


    return this.http.post(`${this.serverUrl}/add-wishitem`, reqBody, this.addTokenToHeader())

  }



  //api to get all item from wishlist

  getItemWishlistApi() {
    return this.http.get(`${this.serverUrl}/all-wishitem`, this.addTokenToHeader())
  }


  getWishlistCount(){
     
this.getItemWishlistApi().subscribe((res:any)=>{
  this.wishlistCount.next(res.length)
})

  }




  removeWishlistItemApi(id: any) {
    return this.http.delete(`${this.serverUrl}/delete-wishlistItem/${id}`)
  }



  addToCartApi(reqBody:any){
return this.http.post(`${this.serverUrl}/add-cart`,reqBody,this.addTokenToHeader())
  }



  //get all cartitem

  getCartItemApi(){
    return this.http.get(`${this.serverUrl}/all-cartItem`,this.addTokenToHeader())
  }

getCartCount(){
  this.getCartItemApi().subscribe((res:any)=>{
    this.cartCount.next(res.length)
  })
}


removeCartItemApi(id: any) {
  return this.http.delete(`${this.serverUrl}/delete-cart/${id}`)
}


//api to empty cart

emptyCartApi(){
  return this.http.delete(`${this.serverUrl}/empty-cart`,this.addTokenToHeader())
}


}



