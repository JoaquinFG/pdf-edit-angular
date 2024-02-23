import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfShowcaseService {

  private hidePdfSource = new BehaviorSubject<boolean>(true);
  hidePdf$ = this.hidePdfSource.asObservable();
  private editPdfSource = new BehaviorSubject<boolean>(true);
  editPdf$ = this.editPdfSource.asObservable();
  private srcPdfSource = new BehaviorSubject<string>('');
  srcPdf$ = this.srcPdfSource.asObservable();
  private documentObjSource = new BehaviorSubject<any>('');
  documentObj$ = this.documentObjSource.asObservable();

  updateHidePdf(value: boolean){
    this.hidePdfSource.next(value);
  }
  updateEditPdf(value: boolean){
    this.editPdfSource.next(value);
  }
  updateSrcPdf(value: string){
    this.srcPdfSource.next(value);
  }

  updateDocumentObj(value: any){
    this.documentObjSource.next(value);
  }
}
