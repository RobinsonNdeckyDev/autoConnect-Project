import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitairesComponent } from './utilitaires.component';

describe('UtilitairesComponent', () => {
  let component: UtilitairesComponent;
  let fixture: ComponentFixture<UtilitairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilitairesComponent]
    });
    fixture = TestBed.createComponent(UtilitairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
