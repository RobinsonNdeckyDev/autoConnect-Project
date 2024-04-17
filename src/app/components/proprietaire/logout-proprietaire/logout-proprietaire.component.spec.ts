import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutProprietaireComponent } from './logout-proprietaire.component';

describe('LogoutProprietaireComponent', () => {
  let component: LogoutProprietaireComponent;
  let fixture: ComponentFixture<LogoutProprietaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutProprietaireComponent]
    });
    fixture = TestBed.createComponent(LogoutProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
