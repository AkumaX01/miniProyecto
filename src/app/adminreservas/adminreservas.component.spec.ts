import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminreservasComponent } from './adminreservas.component';

describe('AdminreservasComponent', () => {
  let component: AdminreservasComponent;
  let fixture: ComponentFixture<AdminreservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminreservasComponent]
    });
    fixture = TestBed.createComponent(AdminreservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
