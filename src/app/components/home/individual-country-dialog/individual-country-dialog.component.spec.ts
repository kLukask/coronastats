import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualCountryDialogComponent } from './individual-country-dialog.component';

describe('IndividualCountryDialogComponent', () => {
  let component: IndividualCountryDialogComponent;
  let fixture: ComponentFixture<IndividualCountryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualCountryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualCountryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
