import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // err:number=0;
  constructor(public router:Router) { }

  ngOnInit(): void {
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
