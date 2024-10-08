import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  confirmAddressStatus:boolean = false
  grandotal:any =""


  constructor(private fb:FormBuilder){}


  checkOutForm = this.fb.group({
    uname: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    flat: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
    place: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    pincode: ["", [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
  


  cancel(){
    this.checkOutForm.reset()
  }

  confirmAddress(){
    this.confirmAddressStatus=true
    this.grandotal=sessionStorage.getItem("total")
  }

  back(){
this.confirmAddressStatus=false
  }

}
