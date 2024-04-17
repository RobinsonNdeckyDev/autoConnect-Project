import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtsUtilitaireComponent } from './dts-utilitaire.component';

describe('DtsUtilitaireComponent', () => {
  let component: DtsUtilitaireComponent;
  let fixture: ComponentFixture<DtsUtilitaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DtsUtilitaireComponent]
    });
    fixture = TestBed.createComponent(DtsUtilitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
