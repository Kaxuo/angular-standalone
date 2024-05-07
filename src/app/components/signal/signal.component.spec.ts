import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalComponent } from './signal.component';

describe('SignalComponent', () => {
  let component: SignalComponent;
  let fixture: ComponentFixture<SignalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalComponent]
    });
    fixture = TestBed.createComponent(SignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
