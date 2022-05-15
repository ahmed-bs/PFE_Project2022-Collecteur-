import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Chef } from '../Models/chef';
import { AuthService } from '../Services/auth.service';
import { ChefService } from '../Services/chef.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user =new Chef();
  err:number=0;

    constructor(
      private translateService :TranslateService,
      private authService: AuthService, 
      public router:Router,
      private chefService:ChefService, ) { 
        this.translateService.setDefaultLang('en');
        this.translateService.use(localStorage.getItem('lang') || 'en')
      }



    ngOnInit () {

    }

    onLoggedin()
    {
      this.authService.login(this.user).subscribe((data)=> {
        let jwToken : any   = data.headers.get('Authorization');
        this.authService.saveToken(jwToken);
        this.chefService.getUserWithUsername(this.user.username).subscribe( u=>{
        console.log("haahahahahahahahahhaa");
        console.log(this.user.username);
        console.log(u.idChef);
        console.log("haahahahahahahahahhaa");
        localStorage.setItem('IdUser', JSON.stringify(u.idChef));
        });

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
