import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSitiosComponent } from './gestion-sitios.component';

describe('GestionSitiosComponent', () => {
  let component: GestionSitiosComponent;
  let fixture: ComponentFixture<GestionSitiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionSitiosComponent]
    });
    fixture = TestBed.createComponent(GestionSitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
