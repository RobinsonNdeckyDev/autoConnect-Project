import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementsComponent } from './signalements.component';

describe('SignalementsComponent', () => {
  let component: SignalementsComponent;
  let fixture: ComponentFixture<SignalementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalementsComponent]
    });
    fixture = TestBed.createComponent(SignalementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
