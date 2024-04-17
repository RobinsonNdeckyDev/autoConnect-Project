import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBlogComponent } from './details-blog.component';

describe('DetailsBlogComponent', () => {
  let component: DetailsBlogComponent;
  let fixture: ComponentFixture<DetailsBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsBlogComponent]
    });
    fixture = TestBed.createComponent(DetailsBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
