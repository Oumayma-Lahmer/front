import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  userRole: string | null = null;


  constructor(private authService: AuthentificationService ,  private router: Router) { }
 

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }
  

}

