import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtsVoitureComponent } from './dts-voiture.component';

describe('DtsVoitureComponent', () => {
  let component: DtsVoitureComponent;
  let fixture: ComponentFixture<DtsVoitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DtsVoitureComponent]
    });
    fixture = TestBed.createComponent(DtsVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
