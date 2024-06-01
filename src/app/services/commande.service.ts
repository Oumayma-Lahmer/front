import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8080/api/commande';
  constructor(private http: HttpClient) {}
  saveCommande(commande: any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/save`, commande);
  }
  getAllCommand(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/List`);
  }
  updateCommande(commande: any): Observable<any> {
    const updateUrl = `${this.baseUrl}/${commande.id}`
    return this.http.put<any>(updateUrl, commande);
  }
  deleteCommande(commande: any): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${commande.id}`;
    return this.http.delete(deleteUrl);

  }

  uploadOrdonnance(formData: FormData):Observable<any>{
   
    const uploadUrl = `${this.baseUrl}/uploadOrdonnance`;
    return this.http.post(uploadUrl,formData,{
      reportProgress: true,
      responseType:'json'
    });
    
  }

}
