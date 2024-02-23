import { Component, ChangeDetectionStrategy, OnInit,  Input } from '@angular/core';
import { NgxExtendedPdfViewerService, PdfDownloadedEvent, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { PdfShowcaseService } from '../../services/pdf-showcase/pdf-showcase.service';
import { Observable, Subject } from 'rxjs';
import { DocumentsService } from '../../services/documents/documents.service';

@Component({
  selector: 'app-pdf-showcase',
  templateUrl: './pdf-showcase.component.html',
  styleUrls: ['./pdf-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfShowcaseComponent implements OnInit{
  @Input() url: string = '';
  @Input() hidePdf: boolean = true;
  @Input() idElementWO?: number;
  @Input() idElementWP?: number;
  @Input() documentObj: any;
  heightPercent: string = '';
  private destroy$: Subject<void> = new Subject<void>();
  srcPdf: string ='https://www.joaquinferreira.com/JoaquinFerreiraCV.pdf';
  editPdf: boolean = true;
  type: string = '';
  idElement: number = 0;
  idDocumentType: string = '';
  public blob: Blob | undefined;
  private blobSubject = new Subject<Blob>();
  validFile: boolean = false;

  getBlobObservable(): Observable<Blob> {
    return this.blobSubject.asObservable();
  }

  constructor(
    private pdfShowcaseService: PdfShowcaseService,
    private pdfViewerService: NgxExtendedPdfViewerService,
    private documentsService: DocumentsService
    ) {
    pdfDefaultOptions.doubleTapZoomFactor = '150%';
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5;

  }

  ngOnInit(): void {
    if (this.idElementWO != undefined && isNaN(this.idElementWP!)) {
      this.type = "WO";
      this.idElement = +this.idElementWO;
    } else if (this.idElementWP != undefined) {
      this.type = "WP";
      this.idElement = +this.idElementWP;
    }
    const windowHeight = window.innerHeight;
    this.heightPercent = JSON.stringify(0.80 * windowHeight)+'px';
    this.pdfShowcaseService.hidePdf$.subscribe((value) => {
      this.hidePdf = value;
    });
    this.pdfShowcaseService.editPdf$.subscribe((value) => {
      this.editPdf = value;
    });
    this.pdfShowcaseService.srcPdf$.subscribe((value) => {
      this.srcPdf = value;
    });
    this.pdfShowcaseService.documentObj$.subscribe((value) => {
      this.validFile = value.format === 'pdf';
      this.documentObj = value;
    });
    this.getBlobObservable().subscribe((blob: Blob) => {
      this.documentsService.exportBlobToBack(blob).subscribe({
        next: (resp => {
          if (resp) {
            this.closePDF();
          }
        })
      })
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closePDF(){
    this.pdfShowcaseService.updateHidePdf(true);
  }

  public async savePdfVersion(): Promise<void> {
    this.blob = await this.pdfViewerService.getCurrentDocumentAsBlob();
    this.blobSubject.next(this.blob);
  }

}
