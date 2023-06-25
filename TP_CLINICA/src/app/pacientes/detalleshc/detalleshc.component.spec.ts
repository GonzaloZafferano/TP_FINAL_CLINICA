import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleshcComponent } from './detalleshc.component';

describe('DetalleshcComponent', () => {
  let component: DetalleshcComponent;
  let fixture: ComponentFixture<DetalleshcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleshcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleshcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
