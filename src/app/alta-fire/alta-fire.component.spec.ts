import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaFireComponent } from './alta-fire.component';

describe('AltaFireComponent', () => {
  let component: AltaFireComponent;
  let fixture: ComponentFixture<AltaFireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaFireComponent]
    });
    fixture = TestBed.createComponent(AltaFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
