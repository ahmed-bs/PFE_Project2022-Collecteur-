import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Chef } from '../Models/chef';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user =new Chef();
  err:number=0;

    constructor(private authService: AuthService, public router:Router ) { }



    ngOnInit () {

    }

    onLoggedin()
    {
      this.authService.login(this.user).subscribe((data)=> {
        let jwToken : any   = data.headers.get('Authorization');
        this.authService.saveToken(jwToken);

          this.router.navigate(['/chef/dashboard']);

        //this.router.navigate(['/']);
         //this.router.navigate(['/employees/admin/employeesList']);
      },(err)=>{   this.err = 1;
  });

   }




    password = "password"
     myFunction() {
      if (this.password === "password") {
        this.password = "text";
      } else {
        this.password = "password";
      }
    }

  }
