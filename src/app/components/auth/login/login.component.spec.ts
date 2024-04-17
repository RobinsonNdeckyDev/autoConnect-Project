import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/services/authentification.service';
// import { of } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let authService: AuthenticationService;
  // let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [DataTablesModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
