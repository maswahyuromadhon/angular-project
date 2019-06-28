import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPerusahaanComponent } from './report-perusahaan.component';

describe('ReportPerusahaanComponent', () => {
  let component: ReportPerusahaanComponent;
  let fixture: ComponentFixture<ReportPerusahaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPerusahaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPerusahaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
