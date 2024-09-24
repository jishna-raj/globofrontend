import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}

  
  loginForm=this.fb.group({
   
    email:["",[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]]

  })

  login(){
    if(this.loginForm.invalid){
      alert('please fill the form completely')
    }
    else{
      this.api.loginApi(this.loginForm.value).subscribe({
        next:(res:any)=>{
          alert('login sucessfull')

          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)


          this.router.navigateByUrl('/')
        },
        error:(err:any)=>{
          if(err.status==406){
            alert(err.error)
          }
          else{
            alert('something went wrong')
          }

        }

      })
    }
  }
}
