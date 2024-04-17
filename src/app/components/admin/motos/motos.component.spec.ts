import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotosComponent } from './motos.component';

describe('MotosComponent', () => {
  let component: MotosComponent;
  let fixture: ComponentFixture<MotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotosComponent]
    });
    fixture = TestBed.createComponent(MotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
