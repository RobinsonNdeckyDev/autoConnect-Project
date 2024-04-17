import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtsMotoComponent } from './dts-moto.component';

describe('DtsMotoComponent', () => {
  let component: DtsMotoComponent;
  let fixture: ComponentFixture<DtsMotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DtsMotoComponent]
    });
    fixture = TestBed.createComponent(DtsMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
