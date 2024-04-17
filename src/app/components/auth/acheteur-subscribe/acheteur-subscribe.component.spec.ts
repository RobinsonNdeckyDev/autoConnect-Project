import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurSubscribeComponent } from './acheteur-subscribe.component';

describe('AcheteurSubscribeComponent', () => {
  let component: AcheteurSubscribeComponent;
  let fixture: ComponentFixture<AcheteurSubscribeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteurSubscribeComponent]
    });
    fixture = TestBed.createComponent(AcheteurSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
