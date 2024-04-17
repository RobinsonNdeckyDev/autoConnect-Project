import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVendeurComponent } from './sidebar-vendeur.component';

describe('SidebarVendeurComponent', () => {
  let component: SidebarVendeurComponent;
  let fixture: ComponentFixture<SidebarVendeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarVendeurComponent]
    });
    fixture = TestBed.createComponent(SidebarVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
