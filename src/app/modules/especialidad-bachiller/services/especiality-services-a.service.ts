import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspecialityServicesAService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3002';

  getAllEspecialities(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/especiality`);
  }

  getAllStudents(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/especiality/students`);
  }

  patchSpeciality(idiest: any, especiality: number) {
    const body = {
      idiest,
      especiality,
    };
    return this.httpClient.patch<any>(`http://localhost:3002/`, body);
  }
}
