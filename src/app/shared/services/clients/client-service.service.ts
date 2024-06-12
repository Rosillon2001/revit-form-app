import { Injectable } from '@angular/core';
// HttpClient
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  private clientsUrl = 'api/clients/';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.clientsUrl).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getClient(id: number): Observable<any> {
    return this.http.get<any>(`${this.clientsUrl}${id}`).pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateClient(client: any): Observable<any> {
    return this.http.put<any>(this.clientsUrl + client?.id, client).pipe(
      // retry 3 times before failing
      retry(3),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  // addClient(client: any): Observable<any> {
  //   client.id = null;
  //   return this.http.post<any>(this.clientsUrl, client).pipe(
  //     retry(3),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error(error);
  //       return throwError(error);
  //     })
  //   );
  // }
}
