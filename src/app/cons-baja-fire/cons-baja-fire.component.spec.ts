import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsBajaFireComponent } from './cons-baja-fire.component';

describe('ConsBajaFireComponent', () => {
  let component: ConsBajaFireComponent;
  let fixture: ComponentFixture<ConsBajaFireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsBajaFireComponent]
    });
    fixture = TestBed.createComponent(ConsBajaFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
