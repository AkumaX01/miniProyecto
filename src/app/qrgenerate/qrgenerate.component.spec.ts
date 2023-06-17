import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrgenerateComponent } from './qrgenerate.component';

describe('QrgenerateComponent', () => {
  let component: QrgenerateComponent;
  let fixture: ComponentFixture<QrgenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrgenerateComponent]
    });
    fixture = TestBed.createComponent(QrgenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
