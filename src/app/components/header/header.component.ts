import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { AuthentificationService} from 'src/app/services/authentification.service';
import { PanierService } from 'src/app/services/panier.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;

  panierElemCount : number = 0;


  @ViewChild('contact') contact!:ElementRef;
 
  constructor(private authService: AuthentificationService ,  private router: Router, private panierService: PanierService) {}
  ngOnInit(): void {

    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });

    this.panierService.getPanierCount().subscribe(count=> {
      this.panierElemCount = count;
    });

    this.loadPanier();
  }
 
  logout(): void {
    this.authService.logout();
  }

  scrollToContact(){
    this.contact.nativeElement.scrollIntoView({behavior:'smooth'})
  }
  loadPanier(): void {
    this.panierService.getPanier().subscribe(response => {
      this.panierElemCount = response.elemList.length;
    });
  }

}





