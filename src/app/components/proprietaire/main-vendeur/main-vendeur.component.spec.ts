import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVendeurComponent } from './main-vendeur.component';

describe('MainVendeurComponent', () => {
  let component: MainVendeurComponent;
  let fixture: ComponentFixture<MainVendeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainVendeurComponent]
    });
    fixture = TestBed.createComponent(MainVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
