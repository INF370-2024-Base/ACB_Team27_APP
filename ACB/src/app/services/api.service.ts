import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private apiUrl = "https://acbapi.azurewebsites.net/api/";

httpOptions ={
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })
}

  constructor(private httpClient: HttpClient) { }

// Fetch all patients
getAllPatients(): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}Patient/GetAllPatients`, this.httpOptions);
}

// Fetch all pre-appointments
getAllPreAppointments(): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}PreAppointment/GetAllPreAppointments`, this.httpOptions);
}

// Get a specific pre-appointment by ID
getPreAppointment(preAppointmentId: number): Observable<any> {
  return this.httpClient.get<any>(`${this.apiUrl}PreAppointment/GetPreAppointment/${preAppointmentId}`, this.httpOptions);
}

// Create a new pre-appointment
createPreAppointment(preAppointment: FormData): Observable<any> {
  return this.httpClient.post<any>(`${this.apiUrl}PreAppointment/CreatePreAppointment`, preAppointment);
}

// Update an existing pre-appointment
updatePreAppointment(preAppointmentId: number, preAppointment: FormData): Observable<any> {
  return this.httpClient.put<any>(`${this.apiUrl}PreAppointment/UpdatePreAppointment/${preAppointmentId}`, preAppointment);
}

// Delete a pre-appointment
deletePreAppointment(preAppointmentId: number): Observable<any> {
  return this.httpClient.delete<any>(`${this.apiUrl}PreAppointment/DeletePreAppointment/${preAppointmentId}`, this.httpOptions);
}
}
