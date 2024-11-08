import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbManipulationComponent } from './db-manipulation.component';

describe('DbManipulationComponent', () => {
  let component: DbManipulationComponent;
  let fixture: ComponentFixture<DbManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbManipulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DbManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
