import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndAngular';
  isLoggedin?: boolean ;
  mySubscription: any;

  constructor(public authService: AuthService,private router: Router, private activatedRoute: ActivatedRoute){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    }); 
 }


  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit () {
    this.authService.loadToken();
    if (this.authService.getToken()==null || 
        this.authService.isTokenExpired()){
          this.router.navigate(['/login']);
     
        }
  }
  
  onLogout(){
    this.authService.logout();
  }
  }
  