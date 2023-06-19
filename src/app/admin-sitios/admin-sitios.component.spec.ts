import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitiosComponent } from './admin-sitios.component';

describe('AdminSitiosComponent', () => {
  let component: AdminSitiosComponent;
  let fixture: ComponentFixture<AdminSitiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSitiosComponent]
    });
    fixture = TestBed.createComponent(AdminSitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
