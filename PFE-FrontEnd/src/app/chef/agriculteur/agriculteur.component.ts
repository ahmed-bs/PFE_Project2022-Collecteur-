import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-agriculteur',
  templateUrl: './agriculteur.component.html',
  styleUrls: ['./agriculteur.component.css']
})
export class AgriculteurComponent implements OnInit {

  constructor(private translateService :TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
   }

  ngOnInit(): void {
  }

}
