import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilVendeurComponent } from './profil-vendeur.component';

describe('ProfilVendeurComponent', () => {
  let component: ProfilVendeurComponent;
  let fixture: ComponentFixture<ProfilVendeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilVendeurComponent]
    });
    fixture = TestBed.createComponent(ProfilVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
