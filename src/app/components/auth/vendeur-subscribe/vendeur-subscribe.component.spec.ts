import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurSubscribeComponent } from './vendeur-subscribe.component';

describe('VendeurSubscribeComponent', () => {
  let component: VendeurSubscribeComponent;
  let fixture: ComponentFixture<VendeurSubscribeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendeurSubscribeComponent]
    });
    fixture = TestBed.createComponent(VendeurSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
