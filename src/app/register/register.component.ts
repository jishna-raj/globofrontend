import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

constructor(private fb:FormBuilder ,private api:ApiService ,private router:Router ){}

registerform = this.fb.group({
  username:['',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]]
})

register(){

  if(this.registerform.valid){
    console.log(this.registerform);
    this.api.registerApi(this.registerform.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('Registration successfull')
        this.router.navigateByUrl('/login')
        
        
      },error:(err:any)=>{
        console.log(err);

        if(err.status==406){
          alert('account already exist')
        }
        else{
          alert('something went wrong')
        }
        
      }
    })
    
  }
  else{
    alert('please fill all the fields properly')
  }

}

}
