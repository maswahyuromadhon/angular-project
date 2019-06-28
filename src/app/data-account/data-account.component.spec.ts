import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAccountComponent } from './data-account.component';

describe('DataAccountComponent', () => {
  let component: DataAccountComponent;
  let fixture: ComponentFixture<DataAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
