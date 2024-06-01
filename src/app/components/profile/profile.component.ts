import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  salaire: number;

  constructor() {
    // Initialisation
    this.nom = "";
    this.prenom = "";
    this.email = "";
    this.password="";
    this.salaire = 1;
  }

  ngOnInit(): void {
   
  }
 
}
