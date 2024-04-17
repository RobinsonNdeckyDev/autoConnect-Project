import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMotoComponent } from './detail-moto.component';

describe('DetailMotoComponent', () => {
  let component: DetailMotoComponent;
  let fixture: ComponentFixture<DetailMotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMotoComponent]
    });
    fixture = TestBed.createComponent(DetailMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
