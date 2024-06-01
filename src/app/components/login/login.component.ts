import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  IsAlert: boolean = false;


  constructor( private fb: FormBuilder,
    private authentifactionService: AuthentificationService, private router: Router) { 

      this.loginForm = this.fb.group({
  
        email:['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })
  }
  ngOnInit(): void { 
    
  
  }

  

  onSubmit() {
    // Vérifie si le formulaire est valide
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authentifactionService.login(formData).subscribe(
        (response) => {
          console.log(response);
          // Vérifie si la connexion est réussie
          if (response.success === 'true') {

            const userRole = this.authentifactionService.getUserRole();

            if(userRole === 'employe'){
              // Redirige vers la page d'accueil si la connexion réussit
              this.router.navigate(['/layout']);
            }
            else if( userRole === 'client'){
              this.router.navigate(['/layout'])
            }
            
            else if( userRole === 'admin'){
              this.router.navigate(['/dashbord'])
            }
            
       
            } else {
            // Affiche l'alerte si les informations de connexion sont incorrectes
            this.OnAlerteOpen();
          }
        },
        (error) => {
          console.error(error);
          // Gère les erreurs en affichant l'alerte
          this.OnAlerteOpen();
        }
      );
    } else {
      this.OnAlerteOpen();
      console.log("Le formulaire n'est pas valide. Veuillez remplir correctement tous les champs.");
    }}
  OnAlerteOpen() {
    console.log('Alerte ouverte');
    this.IsAlert = true;
  }
  OnAlerteClose() {
    console.log('Alerte fermée');
    this.IsAlert = false;
  }
}
