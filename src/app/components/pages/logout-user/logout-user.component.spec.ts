import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutUserComponent } from './logout-user.component';

describe('LogoutUserComponent', () => {
  let component: LogoutUserComponent;
  let fixture: ComponentFixture<LogoutUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutUserComponent]
    });
    fixture = TestBed.createComponent(LogoutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
