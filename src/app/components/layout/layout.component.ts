import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  userRole: string | null = null;
   employee: any;
   client: any;

  constructor(private authService: AuthentificationService ) {
    this.employee = {
      nom : "Employe",
      prenom : "1"
    };
    this.client = {
      nom : "Client",
      prenom : "1"
    };
   }
 

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
     
    });
  }
  

}

