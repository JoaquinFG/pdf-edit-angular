import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfShowcaseComponent } from './pdf-showcase.component';

describe('PdfShowcaseComponent', () => {
  let component: PdfShowcaseComponent;
  let fixture: ComponentFixture<PdfShowcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfShowcaseComponent]
    });
    fixture = TestBed.createComponent(PdfShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
