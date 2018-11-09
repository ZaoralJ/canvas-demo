import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGrindersComponent } from './module-grinders.component';

describe('ModuleGrindersComponent', () => {
  let component: ModuleGrindersComponent;
  let fixture: ComponentFixture<ModuleGrindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleGrindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGrindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
