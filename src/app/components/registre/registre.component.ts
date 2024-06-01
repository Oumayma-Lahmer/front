import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})




export class RegistreComponent implements OnInit {
  
  registrationForm: FormGroup;
  selectedRole : any ;
  
  IsAlert: boolean = false;
  
  constructor( private fb: FormBuilder,
    private authentifactionService: AuthentificationService) {
      this.registrationForm = this.fb.group({
        nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      adresse: [''],
      telephone: [''],
      role: ['', Validators.required],
      fidelite: [''], // Champ de spécialité pour le client
      experience: [''], // Champ d'expérience pour l'employe
      terms: [false, Validators.requiredTrue]
    });
  }
  ngOnInit(): void {

    this.onRoleChange(event);  
 
  }


  
  onRoleChange(event: any) {
    this.selectedRole = event.target.value;
  }

  onSubmit() {
    const formData = this.registrationForm.value;
    this.authentifactionService.inscrireUtilisateur(formData).subscribe(
      (response) => {
        console.log(response);
        // Afficher l'alerte de succès
        
      },
      (error) => {
        console.error(error);
        // Handle errors, display error message, etc.
      }
    );
    this.OnAlerteOpen();
  }
  

  OnAlerteOpen() {
    console.log('Alerte ouverte');
    this.IsAlert = true;
  }
  OnAlerteClose() {
    console.log('Alerte fermée');
    this.IsAlert = false;
  }
}
