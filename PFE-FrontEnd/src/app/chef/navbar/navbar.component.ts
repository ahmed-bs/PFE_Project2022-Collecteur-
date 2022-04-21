import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ChefService } from 'src/app/Services/chef.service';
import { Chef } from 'src/app/Models/chef';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

isLoggedin?: boolean ;
  user?:Chef;

  cin?:number;
  tel?:number;
  prenom?:String;
  nom?:String;


  constructor(
  public authService: AuthService,
  private chefService:ChefService,
   private router: Router) {} 

  ngOnInit(): void {
  this.chefService.getUser(JSON.parse(localStorage.getItem('IdUser') || '[]') || []).subscribe(o=>{
    this.cin = o.cin;
    this.tel = o.tel;
    this.nom = o.nom;
    this.prenom = o.prenom;
    console.log("#################################################");
    console.log(o);
    console.log(o.idChef);
    console.log("#################################################");
  });
  }

  onLogout(){
    this.authService.logout();
    
  }

}

