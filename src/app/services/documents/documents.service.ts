import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiBaseUrl: string = '';

  constructor(
    private http: HttpClient
  ) { }

  exportBlobToBack(blob: Blob) {
    const url = `${this.apiBaseUrl}/sendingPDF`;
    return this.http.post<Document[]>(url, blob);
  }
}
