import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesGuidelineAgeasComponent } from './rules-guideline-ageas.component';

describe('RulesGuidelineAgeasComponent', () => {
  let component: RulesGuidelineAgeasComponent;
  let fixture: ComponentFixture<RulesGuidelineAgeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesGuidelineAgeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RulesGuidelineAgeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
