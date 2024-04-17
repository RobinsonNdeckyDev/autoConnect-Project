import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteursComponent } from './acheteurs.component';

describe('AcheteursComponent', () => {
  let component: AcheteursComponent;
  let fixture: ComponentFixture<AcheteursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheteursComponent]
    });
    fixture = TestBed.createComponent(AcheteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
