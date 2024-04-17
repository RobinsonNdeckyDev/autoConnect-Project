import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesVendeursComponent } from './annonces-vendeurs.component';

describe('AnnoncesVendeursComponent', () => {
  let component: AnnoncesVendeursComponent;
  let fixture: ComponentFixture<AnnoncesVendeursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncesVendeursComponent]
    });
    fixture = TestBed.createComponent(AnnoncesVendeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
