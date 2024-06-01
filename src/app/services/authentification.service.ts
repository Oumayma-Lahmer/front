import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  private baseUrl = 'http://localhost:8080/api/auth';
  private clientApi = 'http://localhost:8080/api/client';

  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userRole$ = this.userRoleSubject.asObservable();  



  constructor(private http: HttpClient) { }

  
  inscrireUtilisateur(inscriptionDTO: InscriptionDTO): Observable<any> {
    const registerUrl = `${this.baseUrl}/registre`;
    return this.http.post(registerUrl, inscriptionDTO);
  }
  login(connexion: Connexion): Observable<any> {
    const loginUrl = `${this.baseUrl}/login`;
    return this.http.post(loginUrl, connexion) .pipe(
      tap((response: any) => {


        if (response.success === 'true') {
          const userRole = response.role;

          // Mettre à jour le sujet BehaviorSubject avec le rôle de l'utilisateur
          this.userRoleSubject.next(userRole);
          localStorage.setItem('userRole', userRole);
        }
      })
    );
 }

 logout(): void {
  // Supprimer les informations de session du localStorage
  localStorage.removeItem('userRole');
  // Mettre à jour le BehaviorSubject et le userRole$ observable
  this.userRoleSubject.next(null);
}

getAllClients(): Observable<any>{
  const clientlist = `${this.clientApi}/list`;
  return this.http.get<any>(clientlist);
}
deleteClient(client: any):Observable<any>{
  const deleteUrl = `${this.clientApi}/${client.id}`;
  return this.http.delete(deleteUrl);
}
editClient(client: any):Observable<any>{
  const editUrl = `${this.clientApi}/${client.id}`;
  return this.http.put(editUrl, client);
}


getUserRole(): any{
  return this.userRoleSubject.value;
}



}


interface InscriptionDTO {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adresse: string;
  telephone: string;
  role: string;
 
 
}
interface Connexion{
  email: string;
  password: string;
  role: string;
}

