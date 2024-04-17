import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUtilitaireComponent } from './detail-utilitaire.component';

describe('DetailUtilitaireComponent', () => {
  let component: DetailUtilitaireComponent;
  let fixture: ComponentFixture<DetailUtilitaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUtilitaireComponent]
    });
    fixture = TestBed.createComponent(DetailUtilitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
